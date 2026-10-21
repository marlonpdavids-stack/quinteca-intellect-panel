"""Quint Dashboard – Savant-style sidebar dashboard for Home Assistant."""
from __future__ import annotations

from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import HomeAssistantView, StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import DOMAIN, PANEL_PATH, STATIC_URL, VERSION
from .updater import QuintUpdater, read_disk_version
from .util import clean_perms, is_newer, valid_image, valid_new_user


class QuintConfigView(HomeAssistantView):
    """Shared dashboard settings (rooms, device map, custom cards)."""

    url = "/api/quint/config"
    name = "api:quint:config"
    requires_auth = True

    def __init__(self, store: Store) -> None:
        self._store = store

    async def get(self, request):
        return self.json(await self._store.async_load() or {})

    async def post(self, request):
        user = request.get("hass_user")
        if user is None or not user.is_admin:
            return self.json_message("Admin required", 403)
        data = await request.json()
        if not isinstance(data, dict):
            return self.json_message("Bad settings", 400)
        old = await self._store.async_load() or {}
        # the Quint admin, user limits and update switches are changed only through their own endpoints
        for key in ("perms", "manager", "upInstall", "upRestart"):
            if key in old:
                data[key] = old[key]
            else:
                data.pop(key, None)
        await self._store.async_save(data)
        return self.json({"ok": True})


class QuintUsersView(HomeAssistantView):
    """People: the Quint admin (a normal user chosen in Settings) and Home Assistant admins
    can list, add and remove normal users and choose which services and rooms each may use."""

    url = "/api/quint/users"
    name = "api:quint:users"
    requires_auth = True

    def __init__(self, hass: HomeAssistant, store: Store) -> None:
        self._hass = hass
        self._store = store

    async def _caller(self, request):
        user = request.get("hass_user")
        cfg = await self._store.async_load() or {}
        is_admin = bool(user and user.is_admin)
        is_mgr = bool(user and not is_admin and cfg.get("manager") and cfg.get("manager") == user.id)
        return user, cfg, is_admin, is_mgr

    async def get(self, request):
        user, cfg, is_admin, is_mgr = await self._caller(request)
        if not (is_admin or is_mgr):
            return self.json_message("Not allowed", 403)
        users = await self._hass.auth.async_get_users()
        return self.json(
            [
                {"id": u.id, "name": u.name, "is_admin": u.is_admin, "is_active": u.is_active, "is_owner": u.is_owner}
                for u in users
                if not u.system_generated
            ]
        )

    async def post(self, request):
        user, cfg, is_admin, is_mgr = await self._caller(request)
        if not (is_admin or is_mgr):
            return self.json_message("Not allowed", 403)
        try:
            body = await request.json()
        except ValueError:
            return self.json_message("Bad request", 400)
        action = body.get("action") if isinstance(body, dict) else None
        auth = self._hass.auth

        if action == "perms":
            cfg["perms"] = clean_perms(body.get("perms"), cfg.get("perms"), user.id if is_mgr else "")
            await self._store.async_save(cfg)
            return self.json({"ok": True, "perms": cfg["perms"]})

        if action == "manager":
            if not is_admin:
                return self.json_message("Admin required", 403)
            uid = body.get("user_id") or ""
            if uid:
                target = await auth.async_get_user(uid)
                if target is None or target.system_generated or target.is_admin or not target.is_active:
                    return self.json_message("Pick a normal user", 400)
                cfg["manager"] = uid
            else:
                cfg.pop("manager", None)
            await self._store.async_save(cfg)
            return self.json({"ok": True, "manager": cfg.get("manager", "")})

        if action == "create":
            msg = valid_new_user(body.get("name"), body.get("username"), body.get("password"))
            if msg:
                return self.json_message(msg, 400)
            from homeassistant.auth.providers import homeassistant as auth_ha

            username = body["username"].strip().lower()
            provider = auth_ha.async_get_provider(self._hass)
            new_user = await auth.async_create_user(body["name"].strip(), group_ids=["system-users"])
            try:
                await provider.async_add_auth(username, body["password"])
                creds = await provider.async_get_or_create_credentials({"username": username})
                await auth.async_link_user(new_user, creds)
            except Exception as err:  # noqa: BLE001 - undo the half-made user, tell the person
                await auth.async_remove_user(new_user)
                return self.json_message(f"Could not add the user ({err})", 400)
            return self.json({"ok": True, "id": new_user.id})

        if action == "delete":
            target = await auth.async_get_user(str(body.get("user_id") or ""))
            if (
                target is None
                or target.system_generated
                or target.is_admin
                or target.is_owner
                or target.id == user.id
                or target.id == cfg.get("manager")
            ):
                return self.json_message("That user cannot be removed here", 400)
            await auth.async_remove_user(target)
            if isinstance(cfg.get("perms"), dict):
                cfg["perms"].pop(target.id, None)
                await self._store.async_save(cfg)
            return self.json({"ok": True})

        return self.json_message("Unknown action", 400)


class QuintVersionView(HomeAssistantView):
    """Running / installed version (the browser reloads itself when it is out of date)."""

    url = "/api/quint/version"
    name = "api:quint:version"
    requires_auth = True

    def __init__(self, hass: HomeAssistant, updater: QuintUpdater) -> None:
        self._hass = hass
        self._updater = updater

    async def get(self, request):
        user = request.get("hass_user")
        if request.query.get("full") and await self._updater.can_manage(user):
            return self.json(await self._updater.status())
        disk = await self._hass.async_add_executor_job(read_disk_version)
        return self.json({"running": VERSION, "disk": disk, "pending": is_newer(disk, VERSION)})


class QuintUpdateView(HomeAssistantView):
    """Admin and Quint admin actions: check now, install now, restart now, automatic-update switches."""

    url = "/api/quint/update"
    name = "api:quint:update"
    requires_auth = True

    def __init__(self, updater: QuintUpdater) -> None:
        self._updater = updater

    async def post(self, request):
        user = request.get("hass_user")
        if not await self._updater.can_manage(user):
            return self.json_message("Admin required", 403)
        body = await request.json()
        action = body.get("action") if isinstance(body, dict) else ""
        up = self._updater
        up.last_error = ""
        if action == "settings":
            await up.set_settings(body.get("install"), body.get("restart"))
        elif action == "check":
            await up.refresh()
        elif action == "install":
            await up.refresh()
            if not await up.install():
                up.last_action = "nothing to install"
        elif action == "restart":
            await up.restart("restart requested")
        else:
            return self.json_message("Unknown action", 400)
        return self.json(await up.status())


class QuintBackgroundView(HomeAssistantView):
    """Optional custom background photo shared by every user."""

    url = "/api/quint/background"
    name = "api:quint:background"
    requires_auth = True

    def __init__(self, store: Store) -> None:
        self._store = store

    async def get(self, request):
        data = await self._store.async_load() or {}
        return self.json({"data": data.get("data", "")})

    async def post(self, request):
        user = request.get("hass_user")
        if user is None or not user.is_admin:
            return self.json_message("Admin required", 403)
        body = await request.json()
        image = body.get("data", "") if isinstance(body, dict) else ""
        if not valid_image(image):
            return self.json_message("Invalid image", 400)
        await self._store.async_save({"data": image})
        return self.json({"ok": True})

    async def delete(self, request):
        user = request.get("hass_user")
        if user is None or not user.is_admin:
            return self.json_message("Admin required", 403)
        await self._store.async_remove()
        return self.json({"ok": True})


class QuintRoomImageView(HomeAssistantView):
    """Optional photo per room, shared by every user (set by an admin)."""

    url = "/api/quint/roomimg"
    name = "api:quint:roomimg"
    requires_auth = True

    def __init__(self, store: Store) -> None:
        self._store = store

    async def get(self, request):
        return self.json(await self._store.async_load() or {})

    async def post(self, request):
        user = request.get("hass_user")
        if user is None or not user.is_admin:
            return self.json_message("Admin required", 403)
        body = await request.json()
        rid = body.get("id", "") if isinstance(body, dict) else ""
        image = body.get("data", "") if isinstance(body, dict) else ""
        if not isinstance(rid, str) or not 0 < len(rid) <= 64 or not valid_image(image):
            return self.json_message("Invalid image", 400)
        data = await self._store.async_load() or {}
        data[rid] = image
        await self._store.async_save(data)
        return self.json({"ok": True})

    async def delete(self, request):
        user = request.get("hass_user")
        if user is None or not user.is_admin:
            return self.json_message("Admin required", 403)
        data = await self._store.async_load() or {}
        data.pop(request.query.get("id", ""), None)
        await self._store.async_save(data)
        return self.json({"ok": True})


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    data = hass.data.setdefault(DOMAIN, {})
    if not data.get("static"):
        store = Store(hass, 1, f"{DOMAIN}.config")
        hass.http.register_view(QuintConfigView(store))
        updater = QuintUpdater(hass, store)
        data["updater"] = updater
        hass.http.register_view(QuintUsersView(hass, store))
        hass.http.register_view(QuintVersionView(hass, updater))
        hass.http.register_view(QuintUpdateView(updater))
        hass.http.register_view(QuintBackgroundView(Store(hass, 1, f"{DOMAIN}.background")))
        hass.http.register_view(QuintRoomImageView(Store(hass, 1, f"{DOMAIN}.roomimg")))
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL, str(Path(__file__).parent / "frontend"), False)]
        )
        data["static"] = True
    data["updater"].start()
    title = entry.data.get("title", "Quint")
    js = Path(__file__).parent / "frontend" / "quint-panel.js"
    stamp = int((await hass.async_add_executor_job(js.stat)).st_mtime)
    guard = f"{STATIC_URL}/quint-guard.js?v={VERSION}.{stamp}"
    frontend.add_extra_js_url(hass, guard)
    data["guard"] = guard
    await panel_custom.async_register_panel(
        hass,
        webcomponent_name="quint-panel",
        frontend_url_path=PANEL_PATH,
        module_url=f"{STATIC_URL}/quint-panel.js?v={VERSION}.{stamp}",
        sidebar_title=title,
        sidebar_icon="mdi:home-automation",
        require_admin=False,
        config={"title": title},
    )
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    frontend.async_remove_panel(hass, PANEL_PATH)
    updater = hass.data.get(DOMAIN, {}).get("updater")
    if updater:
        updater.stop()
    guard = hass.data.get(DOMAIN, {}).pop("guard", None)
    if guard:
        frontend.remove_extra_js_url(hass, guard)
    return True

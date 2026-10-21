"""Automatic updates for Quint.

The chain is:  new release on GitHub  ->  HACS notices it  ->  Quint asks HACS to
install it  ->  Quint sees that the files on disk are newer than the running
version  ->  Quint restarts Home Assistant  ->  open browsers reload by themselves.
Every step can be switched off in Quint -> Settings -> Updates.
"""
from __future__ import annotations

import json
import logging
from datetime import datetime, timedelta
from pathlib import Path

from homeassistant.components import persistent_notification
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import VERSION
from .util import is_newer, looks_like_quint

_LOGGER = logging.getLogger(__name__)
MANIFEST = Path(__file__).parent / "manifest.json"
TICK = timedelta(minutes=1)
REFRESH_EVERY = timedelta(hours=1)
RETRY_RESTART = timedelta(minutes=30)


def read_disk_version() -> str:
    """Version written in manifest.json right now (changes when HACS installs)."""
    try:
        return str(json.loads(MANIFEST.read_text(encoding="utf-8")).get("version", ""))
    except (OSError, ValueError):
        return ""


class QuintUpdater:
    """Watches for new versions, installs them through HACS and restarts Home Assistant."""

    def __init__(self, hass: HomeAssistant, store: Store) -> None:
        self.hass = hass
        self._store = store
        self._unsub = None
        self._seen_disk = ""
        self._last_refresh: datetime | None = None
        self._restart_after: datetime | None = None
        self.last_error = ""
        self.last_action = ""

    # ---- lifecycle -------------------------------------------------------
    def start(self) -> None:
        if self._unsub:
            return
        self._unsub = async_track_time_interval(self.hass, self._tick, TICK)

    def stop(self) -> None:
        if self._unsub:
            self._unsub()
            self._unsub = None

    # ---- helpers ---------------------------------------------------------
    async def settings(self) -> dict:
        cfg = await self._store.async_load() or {}
        return {"install": cfg.get("upInstall") is not False, "restart": cfg.get("upRestart") is not False}

    async def can_manage(self, user) -> bool:
        """Home Assistant admins and the Quint admin may check, install and restart."""
        if user is None:
            return False
        if user.is_admin:
            return True
        cfg = await self._store.async_load() or {}
        return bool(cfg.get("manager")) and cfg.get("manager") == user.id

    async def set_settings(self, install: object, restart: object) -> dict:
        cfg = await self._store.async_load() or {}
        if isinstance(install, bool):
            cfg["upInstall"] = install
        if isinstance(restart, bool):
            cfg["upRestart"] = restart
        await self._store.async_save(cfg)
        return await self.settings()

    def hacs_entity(self) -> str | None:
        """entity_id of the HACS update entity of this integration, if HACS is used."""
        reg = er.async_get(self.hass)
        for entry in reg.entities.values():
            if entry.domain == "update" and entry.platform == "hacs" and looks_like_quint(
                entry.entity_id, entry.original_name, entry.name
            ):
                return entry.entity_id
        for state in self.hass.states.async_all("update"):
            a = state.attributes
            if looks_like_quint(a.get("release_url"), a.get("title"), a.get("friendly_name")) and (
                "hacs" in str(a.get("entity_picture", "")).lower() or "github" in str(a.get("release_url", "")).lower()
            ):
                return state.entity_id
        return None

    async def status(self) -> dict:
        disk = await self.hass.async_add_executor_job(read_disk_version)
        ent = self.hacs_entity()
        st = self.hass.states.get(ent) if ent else None
        a = st.attributes if st else {}
        return {
            "running": VERSION,
            "disk": disk,
            "pending": is_newer(disk, VERSION),
            "settings": await self.settings(),
            "hacs": (
                {
                    "entity": ent,
                    "state": st.state,
                    "installed": a.get("installed_version"),
                    "latest": a.get("latest_version"),
                    "in_progress": bool(a.get("in_progress")),
                    "release_url": a.get("release_url"),
                }
                if st
                else None
            ),
            "last_error": self.last_error,
            "last_action": self.last_action,
        }

    # ---- actions ---------------------------------------------------------
    async def refresh(self) -> None:
        """Ask HACS to look at GitHub again."""
        ent = self.hacs_entity()
        if not ent:
            return
        self._last_refresh = dt_util.utcnow()
        try:
            await self.hass.services.async_call("homeassistant", "update_entity", {"entity_id": ent}, blocking=True)
        except Exception as err:  # noqa: BLE001 - never break the loop
            self.last_error = f"refresh: {err}"
            _LOGGER.debug("Quint refresh failed: %s", err)

    async def install(self) -> bool:
        ent = self.hacs_entity()
        st = self.hass.states.get(ent) if ent else None
        if not st or st.state != "on" or st.attributes.get("in_progress"):
            return False
        self.last_action = f"installing {st.attributes.get('latest_version', '')}"
        _LOGGER.info("Quint: installing %s through HACS", st.attributes.get("latest_version"))
        try:
            await self.hass.services.async_call("update", "install", {"entity_id": ent}, blocking=False)
            return True
        except Exception as err:  # noqa: BLE001
            self.last_error = f"install: {err}"
            _LOGGER.warning("Quint install failed: %s", err)
            return False

    async def restart(self, reason: str = "") -> bool:
        try:
            await self.hass.services.async_call("homeassistant", "restart", {}, blocking=False)
            self.last_action = reason or "restarting"
            return True
        except Exception as err:  # noqa: BLE001 - e.g. invalid configuration
            self.last_error = f"restart: {err}"
            persistent_notification.async_create(
                self.hass, f"Quint could not restart Home Assistant: {err}", title="Quint update", notification_id="quint_update"
            )
            return False

    # ---- periodic check ---------------------------------------------------
    async def _tick(self, _now=None) -> None:
        try:
            await self._check()
        except Exception as err:  # noqa: BLE001
            self.last_error = str(err)
            _LOGGER.debug("Quint update check failed: %s", err)

    async def _check(self) -> None:
        cfg = await self.settings()
        disk = await self.hass.async_add_executor_job(read_disk_version)
        now = dt_util.utcnow()
        if is_newer(disk, VERSION):
            # Files were replaced (by HACS or by hand). Wait until they stop changing, then restart.
            if self._seen_disk != disk:
                self._seen_disk = disk
                persistent_notification.async_create(
                    self.hass,
                    f"Quint {disk} is installed (running {VERSION})."
                    + (" Home Assistant restarts in about a minute to finish the update." if cfg["restart"] else " Restart Home Assistant to finish the update."),
                    title="Quint update",
                    notification_id="quint_update",
                )
                return
            if cfg["restart"] and (self._restart_after is None or now >= self._restart_after):
                self._restart_after = now + RETRY_RESTART
                await self.restart(f"restarting for Quint {disk}")
            return
        # Up to date on disk: keep HACS looking and install what it finds.
        if not self.hacs_entity():
            return
        if cfg["install"] and (self._last_refresh is None or now - self._last_refresh >= REFRESH_EVERY):
            await self.refresh()
        if cfg["install"]:
            await self.install()

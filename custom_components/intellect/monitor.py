"""Wall panel health: every wall tablet reports once a minute, Home Assistant brings a quiet
panel back to the front by itself, and the status of every panel is sent to the Quinteca portal
so Quinteca is alerted when a screen stays offline.

A tablet counts as a wall panel once it has been given a name on the tablet itself
(Intellect settings > Screensaver > This device > Wall panel name). Phones never report.
"""
from __future__ import annotations

import logging
import re
import time
from datetime import timedelta

from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.storage import Store

from .const import PANEL_PATH, VERSION

_LOGGER = logging.getLogger(__name__)

ONLINE_S = 150          # a panel is online if it reported in the last 2.5 minutes
HEAL_AFTER_S = 180      # quiet this long: bring the dashboard back to the front
HEAL_EVERY_S = 600      # at most one self-heal per panel every 10 minutes
REPORT_EVERY_S = 300    # send the status to the portal every 5 minutes (straight away on a change)
DEFAULT_PORTAL = "https://portal.quinteca.com"

# Pushed to a tablet's Companion app by "Apply wall panel settings".
WALL_SETTINGS = [
    ("command_persistent_connection", {"persistent": "always"}),
    ("command_screen_on", {"command": "keep_screen_on"}),
    ("command_screen_off_timeout", {"command": 1800000}),
    ("command_webview", {"command": "/" + PANEL_PATH}),
]


def _slug(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", str(text).lower()).strip("_")[:40] or "panel"


class PanelMonitor:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store = Store(hass, 1, "intellect.panels")
        self._data: dict = {"panels": {}, "portal": {}}
        self._unsub = None
        self._saved_at = 0.0
        self._reported_at = 0.0
        self._last_sig = ""
        self.portal_status = ""

    async def load(self) -> None:
        d = await self._store.async_load() or {}
        self._data = {"panels": d.get("panels") or {}, "portal": d.get("portal") or {}}

    def start(self) -> None:
        if self._unsub is None:
            self._unsub = async_track_time_interval(self.hass, self._tick, timedelta(seconds=60))

    def stop(self) -> None:
        if self._unsub:
            self._unsub()
            self._unsub = None

    async def _save(self, force: bool = False) -> None:
        if force or time.time() - self._saved_at > 600:
            self._saved_at = time.time()
            await self._store.async_save(self._data)

    # ---------- status ----------
    def _status(self, p: dict) -> str:
        age = time.time() - float(p.get("last") or 0)
        if age > ONLINE_S:
            return "offline"
        if p.get("vis") is False:
            return "background"
        if p.get("err"):
            return "error"
        return "online"

    def _device(self, notify: str) -> str:
        return notify[len("mobile_app_"):] if notify and notify.startswith("mobile_app_") else ""

    def _extra(self, p: dict) -> dict:
        """Battery and charging from the linked tablet's Companion app sensors, if enabled."""
        dev, out = self._device(p.get("notify", "")), {}
        if not dev:
            return out
        b = self.hass.states.get(f"sensor.{dev}_battery_level")
        if b and b.state not in ("unknown", "unavailable"):
            try:
                out["battery"] = round(float(b.state))
            except ValueError:
                pass
        c = self.hass.states.get(f"sensor.{dev}_battery_state") or self.hass.states.get(f"sensor.{dev}_charger_type")
        if c and c.state not in ("unknown", "unavailable"):
            out["charging"] = c.state.lower() not in ("discharging", "not_charging", "none")
        return out

    def notify_targets(self) -> list[str]:
        return sorted(s for s in (self.hass.services.async_services().get("notify") or {}) if s.startswith("mobile_app_"))

    def listing(self) -> list[dict]:
        now, out = time.time(), []
        for pid, p in self._data["panels"].items():
            out.append({
                "id": pid, "name": p.get("name", ""), "status": self._status(p), "notify": p.get("notify", ""),
                "ago": int(now - float(p.get("last") or 0)), "ver": p.get("ver", ""), "page": p.get("page", ""),
                "ss": bool(p.get("ss")), "err": p.get("err", 0), "heals": p.get("heals", 0), "user": p.get("user", ""),
                **self._extra(p),
            })
        return sorted(out, key=lambda x: x["name"].lower())

    def _publish(self, pid: str, p: dict) -> None:
        st = self._status(p)
        self.hass.states.async_set(
            f"binary_sensor.intellect_panel_{_slug(p.get('name') or pid)}",
            "on" if st in ("online", "error") else "off",
            {
                "friendly_name": f"{p.get('name') or 'Wall'} panel",
                "device_class": "connectivity",
                "icon": "mdi:tablet-dashboard",
                "status": st,
                "last_seen": time.strftime("%Y-%m-%dT%H:%M:%S", time.localtime(float(p.get("last") or 0))),
                "version": p.get("ver", ""),
                "page": p.get("page", ""),
                "screensaver": bool(p.get("ss")),
                "errors": p.get("err", 0),
                "self_heals": p.get("heals", 0),
                **self._extra(p),
            },
        )

    # ---------- from the tablet ----------
    async def heartbeat(self, user, body: dict) -> dict:
        pid = re.sub(r"[^A-Za-z0-9_-]", "", str(body.get("pid", "")))[:40]
        name = str(body.get("name", "")).strip()[:40]
        if not pid or not name:
            return {"ok": False}
        panels = self._data["panels"]
        p = panels.get(pid) or {}
        changed = p.get("name") != name or not p
        was = self._status(p) if p else ""
        p.update({
            "name": name, "last": time.time(), "ver": str(body.get("ver", ""))[:12], "page": str(body.get("page", ""))[:30],
            "vis": body.get("vis") is not False, "ss": bool(body.get("ss")), "err": int(body.get("err") or 0),
            "ua": str(body.get("ua", ""))[:160], "user": getattr(user, "name", "") or "",
        })
        panels[pid] = p
        cmd = p.pop("cmd", "")
        self._publish(pid, p)
        await self._save(force=changed or bool(cmd))
        if was and was != self._status(p):
            self.hass.async_create_task(self.report(force=True))
        return {"ok": True, "cmd": cmd}

    # ---------- admin actions ----------
    async def action(self, body: dict) -> dict:
        act, pid = body.get("action"), str(body.get("id", ""))
        p = self._data["panels"].get(pid)
        if act == "portal":
            site = re.sub(r"[^A-Za-z0-9]", "", str(body.get("site", ""))).upper()[:16]
            key = str(body.get("key", "")).strip()
            cur = self._data["portal"]
            cur["site"] = site
            if key and not key.startswith("•"):
                cur["key"] = key[:120]
            if body.get("clear"):
                cur.pop("key", None)
            await self._save(force=True)
            await self.report(force=True)
            return {"ok": True}
        if act == "report":
            await self.report(force=True)
            return {"ok": True}
        if p is None:
            return {"ok": False, "error": "Unknown panel"}
        if act == "link":
            n = str(body.get("notify", ""))
            p["notify"] = n if n in self.notify_targets() else ""
        elif act == "rename":
            p["name"] = str(body.get("name", "")).strip()[:40] or p.get("name", "")
        elif act == "forget":
            self.hass.states.async_remove(f"binary_sensor.intellect_panel_{_slug(p.get('name') or pid)}")
            self._data["panels"].pop(pid, None)
        elif act == "reload":
            p["cmd"] = "reload"
        elif act == "apply":
            if not p.get("notify"):
                return {"ok": False, "error": "Link the tablet's Companion app first"}
            for msg, data in WALL_SETTINGS:
                await self._send(p["notify"], msg, data)
        elif act == "wake":
            if not p.get("notify"):
                return {"ok": False, "error": "Link the tablet's Companion app first"}
            await self._send(p["notify"], "command_screen_on", {})
            await self._send(p["notify"], "command_webview", {"command": "/" + PANEL_PATH})
        else:
            return {"ok": False, "error": "Unknown action"}
        await self._save(force=True)
        return {"ok": True}

    async def _send(self, notify: str, message: str, data: dict) -> None:
        try:
            await self.hass.services.async_call("notify", notify, {"message": message, "data": data}, blocking=True)
        except Exception as err:  # noqa: BLE001 - a tablet that can't be reached must not break the loop
            _LOGGER.warning("Intellect: %s to %s failed: %s", message, notify, err)

    # ---------- every minute ----------
    async def _tick(self, _now=None) -> None:
        now = time.time()
        for pid, p in list(self._data["panels"].items()):
            self._publish(pid, p)
            quiet = now - float(p.get("last") or 0)
            background = quiet <= ONLINE_S and p.get("vis") is False
            # Self-heal: the dashboard has gone quiet or is behind another app. Bring it back.
            if p.get("notify") and (quiet > HEAL_AFTER_S or background) and now - float(p.get("healed") or 0) > HEAL_EVERY_S:
                p["healed"] = now
                p["heals"] = int(p.get("heals") or 0) + 1
                _LOGGER.info("Intellect: bringing %s panel back to the front", p.get("name"))
                await self._send(p["notify"], "command_screen_on", {})
                await self._send(p["notify"], "command_webview", {"command": "/" + PANEL_PATH})
        await self._save()
        await self.report()

    # ---------- to Quinteca ----------
    async def report(self, force: bool = False) -> None:
        cfg = self._data["portal"]
        if not cfg.get("site") or not cfg.get("key"):
            self.portal_status = "not set up"
            return
        panels = [{k: v for k, v in x.items() if k not in ("notify", "user")} for x in self.listing()]
        sig = "|".join(f"{x['id']}:{x['status']}" for x in panels)
        if not force and sig == self._last_sig and time.time() - self._reported_at < REPORT_EVERY_S:
            return
        url = (cfg.get("url") or DEFAULT_PORTAL).rstrip("/") + "/pub/panels/report"
        body = {"site": cfg["site"], "key": cfg["key"], "intellect": VERSION, "ha": _ha_version(), "panels": panels}
        try:
            async with async_get_clientsession(self.hass).post(url, json=body, timeout=20) as r:
                if r.status == 200:
                    self._last_sig, self._reported_at = sig, time.time()
                    self.portal_status = "ok"
                else:
                    self.portal_status = f"portal answered {r.status}"
        except Exception as err:  # noqa: BLE001
            self.portal_status = f"cannot reach portal ({type(err).__name__})"

    def portal_info(self) -> dict:
        c = self._data["portal"]
        return {"site": c.get("site", ""), "key": "••••••" if c.get("key") else "", "status": self.portal_status,
                "last": int(time.time() - self._reported_at) if self._reported_at else None}


def _ha_version() -> str:
    try:
        from homeassistant.const import __version__
        return __version__
    except Exception:  # noqa: BLE001
        return ""

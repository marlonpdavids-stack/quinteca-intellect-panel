"""Helpers for Quint Dashboard (no Home Assistant imports, so they are easy to test)."""
from __future__ import annotations

import re

MAX_IMAGE_CHARS = 6_000_000
_IMAGE_RE = re.compile(r"data:image/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}")


def valid_image(data: object) -> bool:
    """True only for a plain base64 jpeg/png/webp data URL of a sane size."""
    return (
        isinstance(data, str)
        and len(data) <= MAX_IMAGE_CHARS
        and _IMAGE_RE.fullmatch(data) is not None
    )


def parse_version(value: object) -> tuple[int, ...]:
    """'1.11.0' / 'v1.11.0' -> (1, 11, 0). Unknown text -> ()."""
    if not isinstance(value, str):
        return ()
    parts = re.findall(r"\d+", value.split("-")[0])
    return tuple(int(p) for p in parts)


def is_newer(candidate: object, current: object) -> bool:
    """True when candidate is a higher version than current."""
    a, b = parse_version(candidate), parse_version(current)
    return bool(a) and bool(b) and a > b


def looks_like_quint(*texts: object) -> bool:
    """Used to find the HACS update entity that belongs to this integration."""
    blob = " ".join(str(t) for t in texts if t).lower()
    return "quint" in blob


def clean_perms(raw: object, keep: dict | None = None, protect: str = "") -> dict:
    """Validate the per-user limits {user_id: {"svcOff": [...], "roomOff": [...]}}.

    Unknown shapes are dropped. Entries with nothing switched off are removed.
    The entry of `protect` (a user id) is always taken from `keep`, so nobody can
    change their own limits.
    """
    out: dict = {}
    if isinstance(raw, dict):
        for uid, p in raw.items():
            if not isinstance(uid, str) or not uid or len(uid) > 64 or not isinstance(p, dict):
                continue
            entry = {}
            for k in ("svcOff", "roomOff"):
                v = p.get(k, [])
                entry[k] = sorted({str(x)[:80] for x in v if isinstance(x, str) and x}) if isinstance(v, list) else []
            if entry["svcOff"] or entry["roomOff"]:
                out[uid] = entry
    if protect:
        out.pop(protect, None)
        if isinstance(keep, dict) and protect in keep:
            out[protect] = keep[protect]
    return out


_USERNAME_RE = re.compile(r"[a-z0-9._-]{2,64}")


def valid_new_user(name: object, username: object, password: object) -> str:
    """'' when fine, otherwise a short message for the person."""
    if not isinstance(name, str) or not name.strip() or len(name.strip()) > 60:
        return "Give the user a name"
    if not isinstance(username, str) or _USERNAME_RE.fullmatch(username.strip().lower()) is None:
        return "The login name may only use letters, numbers and . _ -"
    if not isinstance(password, str) or len(password) < 8 or len(password) > 200:
        return "The password needs at least 8 characters"
    return ""

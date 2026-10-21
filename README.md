# Quinteca Intellect panel

A full-screen, Quinteca-branded control panel for Home Assistant, built for wall-mounted tablets in client homes. One JavaScript file; everything client-specific lives in YAML, so the same file runs on every job.

**Screens:** Home (animated villa, weather, status tiles, access, scenes, music) · Lights & shutters · Security (alarm, zones, live camera) · Cameras (up to 6) · idle screensaver.

**Works with anything Home Assistant exposes:** UniFi Protect and Access, Nuki, Shelly, KNX, Matter, Sonos and alarm panels.

## Repository layout

| Path | What it is |
|---|---|
| `dist/quinteca-panel.js` | The panel. This is the only file a Home Assistant box needs. |
| `INSTALL.md` | Install guide, full config reference and tablet setup. |
| `examples/configuration.yaml` | Example `panel_custom` block. |
| `test/test.js` | Smoke test against a simulated house. |
| `CHANGELOG.md` | What changed in each version. |
| `quint-dashboard/` | Moiz's Quint dashboard (Home Assistant custom integration, v1.27.0), copied with its history from github.com/Moiz6649/quint-dashboard. HACS can't install it from this subfolder; copy `quint-dashboard/custom_components/quint` into the box's `custom_components`. |

## Installing on a client box

1. Copy `dist/quinteca-panel.js` to `/config/www/quinteca/quinteca-panel.js`.
2. Add the `panel_custom` block from `examples/configuration.yaml` to `configuration.yaml` and set the client's entities.
3. Restart Home Assistant and open `/quinteca`.

After each update, bump the `?v=` number on `module_url`, restart, and fully reopen the page or app.

See `INSTALL.md` for the full config reference and wall-tablet setup.

## Developing

```bash
npm install
npm test
```

Update `CHANGELOG.md` and the version line at the top of `dist/quinteca-panel.js` with every change.

---
© 2026 Quinteca LDA. All rights reserved.

# Quinteca Intellect panel for Home Assistant

One file, `quinteca-panel.js`, adds a full-screen Quinteca dashboard to Home Assistant with four screens: **Home**, **Lights & shutters**, **Security** and **Cameras**. The file is identical on every job. Everything client-specific (names, entity IDs) lives in the YAML block below.

## 1. Copy the file into Home Assistant

1. Install the **File editor** add-on (or use Samba / the VS Code add-on).
2. Create the folder `/config/www/quinteca/` (create `www` too if it doesn't exist yet).
3. Upload `quinteca-panel.js` into it.

## 2. Add the panel to `configuration.yaml`

Paste this block, then replace the entity IDs with the client's real ones (Settings › Devices & services › Entities shows every ID).

```yaml
panel_custom:
  - name: quinteca-panel
    url_path: quinteca
    sidebar_title: Quinteca
    sidebar_icon: mdi:home-variant
    module_url: /local/quinteca/quinteca-panel.js?v=1
    config:
      homeName: Casa Bennett
      location: Cascais
      greetingName: Ian
      accent: "#CDF07E"
      securityChime: false        # true = soft chime when the gate/door opens or the alarm arms/disarms from the panel

      weather: weather.forecast_home
      alarm: alarm_control_panel.alarm
      gate: lock.main_gate            # lock, cover, button or switch all work
      frontDoor: lock.front_door
      doorbell: event.main_gate_doorbell   # optional, shows "Doorbell 18:42"
      climate: climate.living_room
      mediaPlayer: media_player.living_room
      wifiClients: sensor.udm_clients      # optional
      internet: sensor.udm_wan_download    # optional

      cameras:                    # max 6, mark the gate camera with gate: true
        - entity: camera.main_gate_high
          name: Main gate
          gate: true
        - entity: camera.driveway_high
          name: Driveway
        - entity: camera.front_door_high
          name: Front door

      zones:                      # door/window/motion binary sensors
        - entity: binary_sensor.front_door_contact
          name: Front door
        - entity: binary_sensor.kitchen_window_contact
          name: Kitchen window
        - entity: binary_sensor.living_room_motion
          name: Living room motion

      scenes:                     # max 4, scenes or scripts
        - entity: scene.good_morning
          name: Good morning
        - entity: scene.evening
          name: Evening
        - entity: script.away
          name: Away
        - entity: scene.good_night
          name: Good night

      rooms:
        - name: Living room
          lights: [light.living_spots, light.living_wall_washers, light.living_floor_lamp]
          covers: [cover.living_window, cover.terrace_doors]
        - name: Kitchen
          lights: [light.kitchen_ceiling, light.kitchen_island]
          covers: [cover.kitchen_window]
        - name: Terrace
          lights: [light.terrace_wall, light.terrace_steps]
```

Then **Developer tools › YAML › Check configuration**, and restart Home Assistant. "Quinteca" appears in the sidebar and opens at `http://<ha-address>:8123/quinteca`.

Anything left out simply shows "Not set up" instead of breaking the screen, so you can start with a few entities and fill in the rest.

## 3. Updating the file later

Home Assistant and Safari cache the file hard. After uploading a new version, bump the number in `module_url` (`?v=1` › `?v=2`) and restart. Changes to the `config:` block only need a restart.

## 4. Setting up the wall iPad

1. Create a Home Assistant user for the panel (e.g. "Wall panel"), not an administrator.
2. On the iPad, log in to Home Assistant in Safari as that user and open `/quinteca`.
3. In that user's Profile, turn on **Always hide the sidebar** so the client never sees Home Assistant's menu.
4. Turn on **Guided Access** (Settings › Accessibility) and set **Auto-Lock** to Never, then triple-click to lock Safari on the panel.

Tip: tapping the Quînteca wordmark opens the Home Assistant menu, for you when the sidebar is visible.

## 5. Health reporting (wall panels)

From version 1.8 the panel reports how it is doing to Home Assistant every minute, and straight away when something goes wrong. The quinteca-ha-base watchdog package picks this up, reloads the tablet if the panel stays broken, and raises an alert if that doesn't fix it.

```yaml
    config:
      panelId: 340jord-panel1      # client code + panel number
      healthUser: Wall panel       # optional: only this HA user reports (default: any non-admin user)
      # healthReport: false        # switch reporting off
```

What counts as a problem:

| Status | Meaning |
|---|---|
| `ok` | Drawing normally, every configured device available |
| `degraded` | Panel fine, but one or more configured devices are unavailable or missing |
| `error` | A screen failed to draw or a script error happened in the last 5 minutes |
| (silence) | Panel not running: app closed, wrong page, tablet asleep or offline. The watchdog spots the missing reports |

The panel also recovers on its own: it reloads after 3 failed draws, if it never connects, or if the connection to Home Assistant is lost for 2 minutes (at most once every 10 minutes).

## Notes and limits

- **Lights**: dimmers are detected automatically; on/off-only lights show just the switch.
- **Shutters**: the Half button appears only when the cover reports its position. Shelly 2PM in cover mode needs calibrating for that; otherwise you get Open, Stop and Close.
- **Cameras**: the grid shows snapshots refreshed every 4 seconds; tapping a camera opens the live stream. Use the Protect high or medium quality entities.
- **Alarm**: Disarmed, Night and Away buttons call the alarm panel directly. If the alarm needs a code you can add `alarmCode:` to the config, but any logged-in Home Assistant user can read the panel config, so prefer setting up the alarm integration to not require a code from Home Assistant.
- **Fonts** load from Google Fonts. Without internet the panel falls back to the system font and keeps working.
- The villa picture is a generic placeholder illustration until the client's own render is ready.

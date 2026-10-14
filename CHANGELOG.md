# Changelog

## 1.10 (14 Oct 2026)
- New Lights & shutters design: one tile for every device. Icon top left, value top right (shown once), name, slim slider with a round knob.
- Tiles glow with brightness or how far open they are: warm white for lights, daylight blue for shutters. Off and closed tiles stay dark.
- Tap the icon to switch a light on/off or to open/close a shutter; tapping a moving shutter stops it. On/off-only lights and shutters without a position say "Tap to …" instead of a slider.
- Room header has calm Lights off/on and Close shutters buttons; corners are smaller (12px tiles, 10px buttons).

## 1.9 (14 Oct 2026)
- Door and gate tiles are calm outline buttons; they only turn warm when the door is actually open. Button-style entries (e.g. UniFi Access unlock) no longer say "ready".
- Optional `gateSensor` / `frontDoorSensor`: a door or gate position sensor shows the real Open / Closed on the tile, chips and screensaver.
- Door slots that aren't configured are hidden instead of showing "Not set up"; a configured door whose entity is missing shows "Unavailable". Unused slots no longer count as unavailable in health reports.
- The Doorbell card shows a live snapshot of the doorbell camera (the one marked `gate: true`) with the time of the last ring, and fills the space left in the access column.
- A fresh ring wakes the panel from the screensaver and opens the doorbell camera with its Open button (`doorbellJump: false` to turn off). Old rings replayed after a restart are ignored.

## 1.8 (14 Oct 2026)
- Health reporting: the wall panel reports its status to Home Assistant every minute (ok, degraded or error), with any on-screen errors and unavailable devices. Needs the watchdog package from quinteca-ha-base.
- If a screen fails to draw, the client sees "Refreshing the panel…" instead of a blank or broken page, and the error is reported straight away.
- Self-heal: the panel reloads itself after 3 failed draws, if it never connects to Home Assistant, or if the connection is lost for 2 minutes. At most one reload every 10 minutes, so a deeper fault can't loop.
- Only non-admin users (the wall panel login) report, so installers opening /quinteca on a laptop don't count. New options: `panelId`, `healthReport`, `healthScript`, `healthUser`.

## 1.7 (9 Oct 2026)
- Every button presses in slightly when touched, so taps feel answered (respects reduced-motion).
- Gate, front door and alarm actions show a short confirmation toast ("Main gate unlocking", "Arming alarm · Away").
- Optional `securityChime: true` plays a soft two-note chime on those security actions only. Off by default; normal taps stay silent.

## 1.6 (9 Oct 2026)
- Dimmers get a full-width drag slider (tap or slide; slide to the left edge to turn off) in place of the − / + buttons.
- Shutters always show Open / Stop / Close; shutters that report position also get a drag slider.
- Home tile values now size to the tile itself, so "Disarmed" fits on every screen size.
- The panel holds the value you set for a few seconds so sliders don't jump back while the device catches up.

## 1.5 (7 Oct 2026)
- Tile values shrink to fit smaller tablet screens ("Disarmed" no longer overflows).

## 1.4 (7 Oct 2026)
- Villa moves constantly: floating house, wall sheen, roof signal rings, fireflies, shooting stars, patrol light round the house.
- Idle screensaver with large clock, date, temperature and status chips; drifts to avoid burn-in; tap to wake. `screensaverMinutes` (default 3, 0 = off) and `screensaverTouchOnly` (default true).
- Quinteca wordmark in the top bar, Q mark on the screensaver.

## 1.3 (7 Oct 2026)
- Animated villa driven by the house: day/night from `sun.sun`, lit windows from lights, door glow when unlocked, alarm ring, camera dots.

## 1.2 (7 Oct 2026)
- `hideSidebar` option for wall panels; iPad/Android safe-area padding.

## 1.1 (7 Oct 2026)
- Configurable door names (`gateName`, `frontDoorName`).

## 1.0 (5 Oct 2026)
- First release: Home, Lights & shutters, Security and Cameras screens.

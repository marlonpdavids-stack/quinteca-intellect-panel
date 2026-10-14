const { JSDOM } = require('jsdom');
const fs = require('fs');
const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', { url: 'http://340jord-ha.home.arpa:8123/quinteca', runScripts: 'outside-only', pretendToBeVisual: true });
const w = dom.window;
w.eval(fs.readFileSync(require('path').join(__dirname, '..', 'dist', 'quinteca-panel.js'), 'utf8'));

const now = new Date().toISOString();
const S = (state, attributes) => ({ state, attributes: attributes || {}, last_updated: now, last_changed: now });
const states = {
  'weather.forecast_home': S('clear-night', { temperature: 19.4, humidity: 68, wind_speed: 14, wind_speed_unit: 'km/h', friendly_name: 'Home' }),
  'alarm_control_panel.alarm': S('disarmed', { friendly_name: 'Alarm' }),
  'lock.main_gate': S('locked', { friendly_name: 'Main gate' }),
  'lock.front_door': S('locked', { friendly_name: 'Front door' }),
  'event.gate_doorbell': S(now, { friendly_name: 'Doorbell' }),
  'climate.living_room': S('heat', { current_temperature: 21.6 }),
  'media_player.living_room': S('playing', { friendly_name: 'Living room', media_title: 'Evening Jazz', media_artist: 'Spotify', volume_level: 0.38 }),
  'sensor.udm_clients': S('42', {}),
  'camera.main_gate': S('streaming', { entity_picture: '/api/camera_proxy/camera.main_gate?token=abc', access_token: 'abc' }),
  'camera.driveway': S('idle', { entity_picture: '/api/camera_proxy/camera.driveway?token=def', access_token: 'def' }),
  'camera.garden': S('unavailable', {}),
  'binary_sensor.kitchen_window': S('on', { device_class: 'window', friendly_name: 'Kitchen window' }),
  'binary_sensor.living_motion': S('off', { device_class: 'motion', friendly_name: 'Living room motion' }),
  'scene.good_morning': S('2026-10-05T07:00:00Z', { friendly_name: 'Good morning' }),
  'scene.evening': S('2026-10-05T18:00:00Z', { friendly_name: 'Evening' }),
  'light.living_spots': S('on', { friendly_name: 'Ceiling spots', brightness: 178, supported_color_modes: ['brightness'] }),
  'light.living_lamp': S('off', { friendly_name: 'Floor lamp', supported_color_modes: ['onoff'] }),
  'cover.living_window': S('open', { friendly_name: 'Living window', current_position: 60, supported_features: 15 }),
  'cover.terrace': S('closed', { friendly_name: 'Terrace doors', supported_features: 3 }),
};
const calls = [];
const hass = { states, callService: (d, s, data) => { calls.push([d, s, data]); return Promise.resolve(); } };

const el = w.document.createElement('quinteca-panel');
el.panel = { config: {
  healthReport: false,
  homeName: 'Casa Test', location: 'Cascais', greetingName: 'Ian',
  doorbell: 'event.gate_doorbell', wifiClients: 'sensor.udm_clients',
  cameras: [{ entity: 'camera.main_gate', name: 'Main gate', gate: true }, 'camera.driveway', { entity: 'camera.garden', name: 'Garden' }],
  zones: ['binary_sensor.kitchen_window', 'binary_sensor.living_motion'],
  scenes: ['scene.good_morning', 'scene.evening'],
  rooms: [{ name: 'Living room', lights: ['light.living_spots', 'light.living_lamp', 'light.missing'], covers: ['cover.living_window', 'cover.terrace'] }, { name: 'Pool', lights: [] }],
} };
el.hass = hass;
w.document.body.appendChild(el);

const QI_STYLE_CHECK = () => /\.tile \{ container-type:inline-size/.test(el.shadowRoot.querySelector('style').textContent) && /cqi/.test(el.shadowRoot.querySelector('style').textContent);
const flush = () => new Promise((r) => w.requestAnimationFrame(() => setTimeout(r, 5)));
const html = () => el.shadowRoot.innerHTML;
const click = (sel) => { const b = el.shadowRoot.querySelector(sel); if (!b) throw new Error('missing ' + sel); b.click(); };
const expect = (cond, msg) => { if (!cond) { throw new Error('FAIL: ' + msg); } console.log('ok -', msg); };

(async () => {
  await flush();
  expect(html().includes('Good evening, Ian') || html().includes('Good morning, Ian') || html().includes('Good afternoon, Ian'), 'home renders greeting');
  expect(html().includes('1<small> / 3</small>'), 'lights count 1 of 3');
  expect(html().includes('Evening Jazz'), 'media title');
  expect(el.shadowRoot.querySelector('.scene.on').textContent === 'Evening', 'latest scene highlighted');
  click('[data-action="access"][data-arg="gate"]');
  expect(JSON.stringify(calls.pop()) === JSON.stringify(['lock', 'unlock', { entity_id: 'lock.main_gate' }]), 'gate unlocks');
  await flush();
  expect(el.shadowRoot.querySelector('.toast') && el.shadowRoot.querySelector('.toast').textContent.includes('unlocking'), 'gate shows a confirmation toast');
  expect(!el._ac, 'no chime unless securityChime is on');
  click('[data-action="vol"][data-arg="5"]');
  expect(calls.pop()[2].volume_level === 0.43, 'volume up');
  click('[data-action="scene"][data-arg="0"]');
  expect(calls.pop()[0] === 'scene', 'scene call');

  click('[data-action="nav"][data-arg="security"]');
  expect(html().includes('Kitchen window is open'), 'security warns about open window');
  expect(html().includes('camera_proxy_stream/camera.main_gate?token=abc'), 'live stream url');
  click('[data-action="alarm"][data-arg="away"]');
  expect(calls.pop()[1] === 'alarm_arm_away', 'arm away');
  await flush();
  expect(el.shadowRoot.querySelector('.toast.warn') && html().includes('Arming alarm'), 'arming shows a confirmation toast');
  el._toast = null;
  click('[data-action="seccam"][data-arg="2"]');
  expect(html().includes('Camera offline'), 'offline camera handled');

  click('[data-action="nav"][data-arg="cameras"]');
  expect(el.shadowRoot.querySelectorAll('.cam').length === 3, 'camera grid shows 3');
  click('[data-action="camfocus"][data-arg="1"]');
  expect(el.shadowRoot.querySelector('.strip button.on').textContent.trim() !== '', 'focused camera view');
  click('[data-action="camall"]');
  expect(el.shadowRoot.querySelectorAll('.cam').length === 3, 'back to grid');

  click('[data-action="nav"][data-arg="lights"]');
  expect(html().includes('Dimmer · 70%'), 'dimmer level');
  expect(QI_STYLE_CHECK(), 'tile values size to the tile (Disarmed fits)');
  expect(/button:active:not\(:disabled\)/.test(el.shadowRoot.querySelector('style').textContent), 'buttons have a press state');
  expect(html().includes('Not found'), 'missing light handled');
  expect(!html().includes('data-pos="50"') && el.shadowRoot.querySelectorAll('[data-action="coverstop"]').length === 2, 'every shutter has Open / Stop / Close');
  expect(el.shadowRoot.querySelectorAll('[data-slider="light"]').length === 1, 'dimmer gets a slider, switch does not');
  expect(el.shadowRoot.querySelectorAll('[data-slider="cover"]').length === 1, 'only positionable shutter gets a slider');
  // drag the dimmer slider to ~40%
  const sl = el.shadowRoot.querySelector('[data-slider="light"]');
  sl.getBoundingClientRect = () => ({ left: 100, width: 200, top: 0, height: 52 });
  const pe = (type, x) => { const e = new w.Event(type, { bubbles: true, composed: true }); e.clientX = x; e.pointerId = 1; return e; };
  sl.dispatchEvent(pe('pointerdown', 150));
  el._render();
  expect(el.shadowRoot.querySelector('[data-slider="light"]') === sl, 'no redraw while dragging');
  sl.dispatchEvent(pe('pointermove', 180));
  expect(sl.querySelector('[data-val]').textContent === '40%', 'slider shows live value');
  sl.dispatchEvent(pe('pointerup', 180));
  let last = calls.pop();
  expect(last[1] === 'turn_on' && last[2].brightness_pct === 40, 'slider sets brightness 40%');
  expect(html().includes('Dimmer · 40%'), 'held value shown until HA catches up');
  const sl2 = el.shadowRoot.querySelector('[data-slider="light"]');
  sl2.getBoundingClientRect = () => ({ left: 100, width: 200, top: 0, height: 52 });
  sl2.dispatchEvent(pe('pointerdown', 101)); sl2.dispatchEvent(pe('pointerup', 101));
  expect(calls.pop()[1] === 'turn_off', 'slide to the left edge turns off');
  const cs = el.shadowRoot.querySelector('[data-slider="cover"]');
  cs.getBoundingClientRect = () => ({ left: 0, width: 100, top: 0, height: 52 });
  cs.dispatchEvent(pe('pointerdown', 25)); cs.dispatchEvent(pe('pointerup', 25));
  last = calls.pop();
  expect(last[1] === 'set_cover_position' && last[2].position === 25, 'shutter slider sets position');
  el._hold = {};
  el._render();
  click('[data-action="cover"][data-arg="cover.terrace"][data-pos="100"]');
  expect(calls.pop()[1] === 'open_cover', 'cover without position opens');
  click('[data-action="roomtoggle"]');
  expect(calls.pop()[1] === 'turn_off', 'room off');
  click('[data-action="closeall"]');
  expect(calls.pop()[2].entity_id.length === 2, 'close all covers');
  click('[data-action="room"][data-arg="1"]');
  expect(html().includes('Pool'), 'empty room renders');

  // state change triggers re-render
  click('[data-action="nav"][data-arg="home"]');
  hass.states = Object.assign({}, states, { 'alarm_control_panel.alarm': Object.assign(S('armed_away'), { last_updated: 'x' }) });
  el.hass = Object.assign({}, hass);
  await flush();
  expect(html().includes('Armed · Away'), 're-renders on state change');


  // ---------- health reporting and self-heal ----------
  const hcalls = [];
  const hh = { states, user: { name: 'Wall panel', is_admin: false }, connected: true,
    callService: (d, s, data) => { hcalls.push([d, s, data]); return Promise.resolve(); } };
  const e3 = w.document.createElement('quinteca-panel');
  e3.panel = { config: { panelId: '340jord-panel1', rooms: [{ name: 'Living room', lights: ['light.living_spots', 'light.missing'] }] } };
  e3.hass = hh;
  w.document.body.appendChild(e3);
  await flush();
  e3._healthReport(true);
  let rep = hcalls.pop();
  expect(rep && rep[0] === 'script' && rep[1] === 'quinteca_panel_report', 'reports to the watchdog script');
  expect(rep[2].panel === '340jord-panel1' && rep[2].version === '1.8', 'report carries panel id and version');
  expect(rep[2].status === 'degraded' && rep[2].unavailable.includes('light.missing'), 'missing entity reported as degraded');
  e3._healthReport(false);
  expect(hcalls.length === 0, 'no duplicate report inside the minute');

  e3.hass = Object.assign({}, hh, { user: { name: 'Marlon', is_admin: true } });
  e3._healthReport(true);
  expect(hcalls.length === 0, 'admin sessions do not report');
  e3.panel = { config: { panelId: '340jord-panel1', healthUser: 'marlon' } };
  e3._healthReport(true);
  expect(hcalls.length === 1, 'healthUser override reports for that user');
  hcalls.length = 0;
  e3.panel = { config: { panelId: '340jord-panel1', rooms: [{ name: 'Living room', lights: ['light.living_spots', 'light.missing'] }] } };
  e3.hass = Object.assign({}, hh, { connected: false });
  e3._healthReport(true);
  expect(hcalls.length === 0, 'no report while disconnected');
  e3.hass = hh;

  // a view that crashes: holding message, error reported, reload after 3 failures
  let reloads = 0;
  e3._reloadFn = () => { reloads += 1; };
  w.sessionStorage.removeItem('qi-reload-at');
  const realHome = e3._viewHome;
  e3._viewHome = () => { throw new Error('boom'); };
  e3._view = 'home';
  e3._render(); e3._render();
  expect(e3.shadowRoot.innerHTML.includes('Refreshing the panel'), 'crash shows a holding message, not a blank screen');
  expect(reloads === 0, 'no reload on the first failures');
  e3._render();
  expect(reloads === 1, 'reloads itself after 3 failed draws');
  e3._render(); e3._render(); e3._render();
  expect(reloads === 1, 'reload is rate limited (no reload loop)');
  e3._viewHome = realHome;
  e3._render();
  expect(e3._health.renderFails === 0 && e3.shadowRoot.querySelector('.dock'), 'recovers once the view draws again');
  await new Promise((r) => setTimeout(r, 2100));
  rep = hcalls.pop();
  expect(rep && rep[2].status === 'error' && rep[2].errors.some((x) => x.includes('render: boom')), 'render error reported straight away');

  // page-level errors
  e3._health.errors = [];
  w.dispatchEvent(new w.ErrorEvent('error', { message: 'ResizeObserver loop completed with undelivered notifications.' }));
  expect(e3._healthStatus() !== 'error', 'browser noise ignored');
  w.dispatchEvent(new w.ErrorEvent('error', { message: 'Cannot read properties of undefined' }));
  expect(e3._healthStatus() === 'error', 'page script error marks the panel in error');
  e3._health.errors = [];

  // stuck connecting
  const e4 = w.document.createElement('quinteca-panel');
  e4.panel = { config: {} };
  w.document.body.appendChild(e4);
  let r4 = 0; e4._reloadFn = () => { r4 += 1; };
  w.sessionStorage.removeItem('qi-reload-at');
  e4._health.since = Date.now() - 3 * 60000;
  e4._healthTick();
  expect(r4 === 1, 'reloads if it never connects to Home Assistant');
  e4.remove();

  // empty config
  const e2 = w.document.createElement('quinteca-panel');
  e2.panel = { config: {} };
  e2.hass = { states: {}, callService: () => Promise.resolve() };
  w.document.body.appendChild(e2);
  await flush();
  ['home', 'security', 'cameras', 'lights'].forEach((v) => { e2._view = v; e2._render(); });
  expect(e2.shadowRoot.innerHTML.includes('Add rooms'), 'empty config renders all views');
  console.log('ALL PASSED');
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });

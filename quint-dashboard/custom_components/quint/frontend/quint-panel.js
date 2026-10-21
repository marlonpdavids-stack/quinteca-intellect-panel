/* Quint Dashboard – Savant-style full-page dashboard for Home Assistant (HACS plugin) */
const ic = (p) => `<svg class="si" viewBox="0 0 24 24">${p}</svg>`;
const SV = {
  security:{ n: "Security", c: "#34c98b", i: ic('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>') },
  cameras: { n: "Cameras",  c: "#4aa3ff", i: ic('<path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>') },
  clock:   { n: "Clock", c: "#e8c98f", i: ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>') },
  camwall: { n: "Cam wall", c: "#38bdf8", i: ic('<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>') },
  intercom: { n: "Intercom", c: "#4ade80", i: ic('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>') },
  lights:  { n: "Lighting", c: "#f5a623", i: ic('<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>') },
  climate: { n: "Climate",  c: "#ff7a59", i: ic('<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/>') },
  media:   { n: "Media",    c: "#b388ff", i: ic('<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>') },
  shades:  { n: "Shades",   c: "#2dd4bf", i: ic('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 8h18M3 13h18M12 13v6"/>') },
  automations: { n: "Automations", c: "#fbbf24", i: ic('<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>') },
  more:    { n: "More",     c: "#ff6fae", i: ic('<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>') },
};
const SV_DEF = Object.fromEntries(Object.entries(SV).map(([k, v]) => [k, v.n]));
const HOME_I = ic('<path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>');
const GEAR_I = ic('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>');
const SHIELD_I = ic('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>');
const SUN_I = ic('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>');
const MOON_I = ic('<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>');
const CLOUD_I = ic('<path d="M18 18H7a4 4 0 1 1 .9-7.9A6 6 0 0 1 19 11a3.5 3.5 0 0 1-1 7z"/>');
const MUSIC_I = ic('<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>');
const PREV_I = ic('<path d="M19 20L9 12l10-8z"/><path d="M5 19V5"/>');
const NEXT_I = ic('<path d="M5 4l10 8-10 8z"/><path d="M19 5v14"/>');
const PLAY_I = ic('<path d="M7 4l13 8-13 8z" fill="currentColor"/>');
const PAUSE_I = ic('<path d="M8 5v14M16 5v14" stroke-width="3"/>');
const PHONE_I = SV.intercom.i;
const VIDEO_I = SV.cameras.i;
const KEY_I = ic('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-1.5"/>');
const PALETTE_I = ic('<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2a10 10 0 1 0 0 20 2 2 0 0 0 2-2 2 2 0 0 1 2-2h2a4 4 0 0 0 4-4A10 10 0 0 0 12 2z"/>');
const TILES_I = ic('<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="5" rx="1"/><rect x="13" y="10" width="8" height="11" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/>');
const SCENE_I = ic('<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 16l.7 1.8L21.5 18.5l-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z"/>');
const VOL_I = ic('<path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>');
const WX = { "clear-night": "Clear night", cloudy: "Cloudy", exceptional: "Exceptional", fog: "Foggy", hail: "Hail", lightning: "Thunderstorm", "lightning-rainy": "Thunderstorm", partlycloudy: "Partly cloudy", pouring: "Heavy rain", rainy: "Rain", snowy: "Snow", "snowy-rainy": "Sleet", sunny: "Sunny", windy: "Windy", "windy-variant": "Windy" };
(() => {
  try {
    if (document.getElementById("quint-fonts")) return;
    const l = document.createElement("link"); l.id = "quint-fonts"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(l);
  } catch (e) {}
})();
const ICONS = {
  bulb: SV.lights.i, plug: ic('<path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0zM12 18v4"/>'),
  fan: ic('<circle cx="12" cy="12" r="2"/><path d="M12 10C12 4 17 3 17 6s-3 4-5 4zM14 12c6 0 7 5 4 5s-4-3-4-5zM12 14c0 6-5 7-5 4s3-4 5-4zM10 12C4 12 3 7 6 7s4 3 4 5z"/>'),
  tv: ic('<rect x="2" y="5" width="20" height="13" rx="2"/><path d="M8 21h8"/>'),
  speaker: ic('<rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="15" r="3"/><circle cx="12" cy="7" r="1"/>'),
  door: ic('<path d="M5 21V3h10l4 2v16M5 21h14"/><circle cx="13" cy="12" r=".8"/>'),
  water: ic('<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>'),
  flame: ic('<path d="M12 22c4 0 7-3 7-7 0-3-2-5-3-7-1 2-2 3-3 3 0-4-2-7-4-9 0 5-4 7-4 12 0 4 3 8 7 8z"/>'),
  snow: ic('<path d="M12 2v20M4 7l16 10M20 7L4 17"/>'),
  bell: ic('<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M10 21h4"/>'),
  power: ic('<path d="M12 3v9M6.4 6.6a8 8 0 1 0 11.2 0"/>'),
  lock: ic('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
  camera: ic('<path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>'),
  home: ic('<path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>'),
};
const LOGO_I = ic('<path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M12 8v8M8 10l4 2 4-2"/>');
const SET_I = {
  general: ic('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),
  pages: ic('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 17h7M17.5 14v7"/>'),
  rooms: ICONS.door, devices: ICONS.plug, home: ICONS.home,
  cards: ic('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/>'),
};
SET_I.wall = ICONS.camera; SET_I.updates = ic('<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/>'); SET_I.access = ICONS.door; SET_I.rdev = ICONS.plug; SET_I.srooms = ICONS.door; SET_I.users = ic('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><path d="M17 5.5a3.2 3.2 0 0 1 0 6M18.5 14.8c1.9.7 3.1 2.4 3.5 5.2"/>');  SET_I.autos = SV.automations.i; SET_I.bg = PALETTE_I; SET_I.rphoto = ICONS.camera; SET_I.tiles = TILES_I; SET_I.intercom = SV.intercom.i; SET_I.scenes = SCENE_I;
const SHADE_DC = ["shutter", "blind", "curtain", "shade", "awning", "window"];
const SEC_BS = ["door", "window", "opening", "garage_door", "lock", "occupancy", "motion", "tamper"];
const OFF = ["off", "unavailable", "unknown", "standby", "closed", "locked", "idle"];
const KEY = "quint_cfg";
const VER = "1.27.0";
const HOLD_MS = 2000;
// z = how much a tile and its contents are scaled, m = how wide its column is (small sizes keep a little more room so the text still fits)
const TSIZES = { xl: { n: "Extra large", z: 1.3, m: 1.3 }, l: { n: "Large", z: 1, m: 1 }, s: { n: "Small", z: 0.8, m: 0.9 }, xs: { n: "Very small", z: 0.62, m: 0.8 } };
const isCs = (s) => typeof s === "string" && (s === "more" || s.startsWith("cs:"));
const BG = {
  midnight: "radial-gradient(900px 560px at 88% -6%,rgba(176,122,74,.55),transparent),radial-gradient(760px 620px at -6% 92%,rgba(46,104,150,.50),transparent),linear-gradient(160deg,#17233a,#0c1220 55%,#0a0e18)",
  graphite: "linear-gradient(160deg,#15171c,#2b2f38)",
  aurora: "radial-gradient(900px 600px at 20% 0%,rgba(52,201,139,.30),transparent),radial-gradient(800px 600px at 90% 100%,rgba(179,136,255,.26),transparent),linear-gradient(160deg,#07121a,#10202c)",
  sunset: "radial-gradient(900px 600px at 80% 0%,rgba(255,122,89,.36),transparent),radial-gradient(800px 600px at 0% 100%,rgba(179,136,255,.26),transparent),linear-gradient(160deg,#1a0f1f,#2a1a2e)",
  ocean: "radial-gradient(900px 600px at 10% 0%,rgba(74,163,255,.38),transparent),linear-gradient(160deg,#04111f,#0a2540)",
  forest: "radial-gradient(900px 600px at 90% 0%,rgba(52,201,139,.30),transparent),linear-gradient(160deg,#07140f,#10261c)",
};
const SWATCH = {
  midnight: "linear-gradient(135deg,#2e6896,#0c1220 55%,#b07a4a)",
  graphite: "linear-gradient(135deg,#454b58,#15171c)",
  aurora: "linear-gradient(135deg,#34c98b,#07121a 58%,#b388ff)",
  sunset: "linear-gradient(135deg,#ff7a59,#2a1a2e 58%,#b388ff)",
  ocean: "linear-gradient(135deg,#4aa3ff,#04111f)",
  forest: "linear-gradient(135deg,#34c98b,#07140f)",
};
const FRESH = () => ({ rooms: [], floors: [], map: {}, hide: [], name: "", custom: {}, order: {} });

const CSS = `
:host{display:block;--vh:100vh;height:var(--vh);overflow-y:auto;--ac:#e8c98f;--ok:#5fd39a;--warn:#f0b35a;--bad:#ff6b6b;--mu:#9aa6bd;--tx:#eef1f6;--bd:rgba(255,255,255,.10);--cd:rgba(12,16,26,.55);--serif:"Cormorant Garamond","Quint Serif",Georgia,"Times New Roman",serif;color:var(--tx);font-family:"Inter","Quint Sans",-apple-system,"SF Pro Display","Segoe UI",Roboto,sans-serif}
@supports (height:100dvh){:host{--vh:100dvh}}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
.si{width:1em;height:1em;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;vertical-align:-.12em}
.app{flex:1 0 auto;display:flex;flex-direction:column;position:relative;z-index:1}
#r{position:relative;display:flex;flex-direction:column;min-height:100%}
.bgl{flex:none;position:sticky;top:0;height:var(--vh,100vh);margin-bottom:calc(var(--vh,100vh) * -1);overflow:hidden;pointer-events:none;z-index:0;background:#0b1220}
.bgl i{position:absolute;inset:-30px;background-image:var(--qbg-img,none);background-size:cover;background-position:center;filter:blur(var(--qbg-blur,0px))}
.bgl::after{content:"";position:absolute;inset:0;background:rgba(5,8,16,var(--qbg-dim,0))}
button{font:inherit;color:inherit;cursor:pointer}
main{flex:1;display:flex;flex-direction:column;min-width:0}
.serif{font-family:var(--serif)}
.brand{display:flex;align-items:center;gap:12px;font-size:19px;letter-spacing:7px;font-weight:500;text-transform:uppercase;min-height:34px}
.ib{background:rgba(255,255,255,.07);border:1px solid var(--bd);border-radius:50%;width:38px;height:38px;font-size:18px;display:grid;place-items:center;padding:0;flex:none;letter-spacing:0}
.top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px}
.page{padding:34px 44px 30px;max-width:1500px;width:100%;margin:0 auto;flex:1}
h1{font-family:var(--serif);font-weight:400;font-size:46px;line-height:1.05;margin:6px 0 8px}
.page>h1,.page>.top+h1{margin-bottom:14px}
h2{font-weight:600;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--mu);margin:30px 0 12px}
.sub{color:var(--mu);font-size:15px;margin-top:4px}.lbl{color:var(--mu);font-size:13px}
.cap{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;font-weight:600;color:#a9b4c9;margin-bottom:12px}
.back{background:rgba(255,255,255,.07);border:1px solid var(--bd);border-radius:10px;color:#fff;padding:9px 16px;font-size:14px}
/* ===== home ===== */
.home{display:grid;grid-template-columns:minmax(0,1fr);gap:24px;padding:26px 18px 22px;flex:1;align-content:start}
.hl{display:flex;flex-direction:column;min-width:0}
.hr{min-width:0;display:flex;flex-direction:column}
.clk{font-family:var(--serif);font-size:56px;font-weight:400;line-height:1.12;margin-top:20px;letter-spacing:-.5px;white-space:nowrap;max-width:100%}
.clk2{font-family:var(--serif);font-size:44px;font-weight:400;line-height:1;letter-spacing:-1px;white-space:nowrap}
.clk2 small{font-family:"Inter",sans-serif;font-size:.24em;font-weight:600;letter-spacing:2px;margin-left:.45em;color:#c3cbdb;vertical-align:.85em}
.ctk .dt{margin-top:10px}.ctk .aclk{margin:2px 0}
.aclk{color:var(--tx)}.aclk svg{display:block;width:100%;height:100%}.aclk.left{width:150px;height:150px;margin-top:20px}.aclk.tl{width:min(100%,190px);aspect-ratio:1}
.aclk .fc{fill:rgba(255,255,255,.04);stroke:rgba(255,255,255,.2);stroke-width:1.5}.aclk .tm1{stroke:rgba(255,255,255,.28);stroke-width:1}.aclk .tm5{stroke:rgba(255,255,255,.7);stroke-width:2.2;stroke-linecap:round}
.aclk text{fill:#c3cbdb;font:600 11px var(--serif);}.aclk g{transform-origin:100px 100px;transform-box:view-box}
.aclk .ahh line{stroke:var(--tx);stroke-width:6;stroke-linecap:round}.aclk .amh line{stroke:var(--tx);stroke-width:3.8;stroke-linecap:round}.aclk .ash line{stroke:var(--ac);stroke-width:1.6;stroke-linecap:round}.aclk .cd{fill:var(--ac)}
:host([data-dev="phone"]) .aclk.left{width:120px;height:120px;margin-top:14px}:host([data-wide="1"]) .aclk.left{width:clamp(150px,12vw,190px);height:clamp(150px,12vw,190px);margin-top:30px}
.clk small{font-family:"Inter",sans-serif;font-size:.2em;font-weight:600;letter-spacing:2px;margin-left:.45em;color:#c3cbdb;vertical-align:.85em}
.dt{font-size:16px;color:#d3d9e6;margin-top:8px}
.wx{display:flex;align-items:center;gap:10px;margin-top:16px;color:#d3d9e6;font-size:15px}.wx .si{font-size:20px;color:var(--ac);flex:none}
.gr{font-family:var(--serif);font-style:italic;font-size:34px;margin-top:26px;font-weight:400;line-height:1.1}
.scn{margin-top:26px}
.scg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.scb{display:flex;align-items:center;gap:10px;text-align:left;padding:14px 14px;border-radius:8px;border:1px solid rgba(120,160,220,.22);background:rgba(28,52,90,.50);font-size:14px;font-weight:500;min-width:0;transition:background .15s}
.scb i{width:8px;height:8px;border-radius:50%;border:1.5px solid #cfd8ea;flex:none}
.scb span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.scb.on{background:#f1efec;color:#12151c;border-color:#f1efec}.scb.on i{background:#12151c;border-color:#12151c}
.scb:active{transform:scale(.98)}
.bento{display:grid;grid-template-columns:repeat(var(--cols,1),minmax(0,1fr));gap:16px;align-items:start}
.bcol{display:flex;flex-direction:column;gap:16px;min-width:0}
.bwide{margin-top:16px}
.bc.cam1{padding:8px}
.cam1 .cvw{aspect-ratio:16/9;min-height:0;flex:none}
.wallpage{max-width:none;padding-top:26px;padding-bottom:20px}
.wallg{display:grid;width:100%}
.wallg .wt{min-height:0;height:100%;border-radius:12px}
.wallg .wt .wo{font-size:13px;color:#8b7d6c}
.wallg.sm .wt .cn{font-size:10px;left:7px;top:6px}.wallg.sm .wt .live{font-size:9px;right:7px;top:6px}
.wallg .wt img.wallx{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;margin:0}
.scb{width:100%}
.cvw .xp{position:absolute;right:12px;bottom:8px;z-index:1;font-size:18px;text-shadow:0 1px 4px #000a;opacity:.9}
.bc{background:var(--cd);border:1px solid var(--bd);border-radius:20px;padding:20px 22px 20px;position:relative;min-width:0;display:flex;flex-direction:column}
.bc.wide{grid-column:1/-1}
.bh{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:14px;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:600;color:#aeb8cc;cursor:pointer}
.bh .bs{letter-spacing:0;text-transform:none;font-weight:500;font-size:13px;color:#c3cbdb;display:flex;align-items:center;gap:6px}.bh .si{font-size:17px}
.rw{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:5px 0;font-size:15px;min-height:36px}
.rw .nmx{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#dde2ec}
.rw .rr{display:flex;align-items:center;gap:14px;flex:none}.rw .mu{color:#b7c0d1;font-size:14px}
.rw .v{font-weight:600;color:#fff;text-align:right}.rw .v.w{color:var(--warn)}.rw .v.b{color:var(--bad)}
.st2{font-family:var(--serif);font-size:34px;display:flex;align-items:center;gap:12px;margin:0 0 12px;line-height:1.1}
.sd{width:14px;height:14px;border-radius:50%;background:var(--ok);box-shadow:0 0 0 4px rgba(95,211,154,.18);flex:none}.sd.w{background:var(--warn);box-shadow:0 0 0 4px rgba(240,179,90,.2)}.sd.b{background:var(--bad);box-shadow:0 0 0 4px rgba(255,107,107,.22)}
.seg{display:flex;background:rgba(0,0,0,.30);border:1px solid var(--bd);border-radius:12px;padding:4px;margin-top:auto}
.seg button{flex:1;padding:11px 0;border:0;background:none;border-radius:9px;font-weight:600;font-size:14px;color:#dfe4ee}
.seg button.on{background:#f1efec;color:#12151c}
.bc>.rows{margin-bottom:12px}
.cvw{position:relative;border-radius:14px;overflow:hidden;flex:1 1 auto;min-height:190px;background:linear-gradient(135deg,#2b2016,#14100c);cursor:pointer;display:grid;place-items:center;color:#8b7d6c}
.cvw img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.cvw .cn{position:absolute;left:12px;top:10px;font-size:12px;font-weight:600;text-shadow:0 1px 4px #000a;z-index:1}
.cvw .live{position:absolute;right:12px;top:10px;z-index:1;text-shadow:0 1px 4px #000a}
.live{display:inline-flex;gap:6px;align-items:center;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase}.live::before{content:"";width:7px;height:7px;border-radius:50%;background:#ff5d5d}
.cb{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}
.wb,.ob{padding:13px 10px;border-radius:9px;font-weight:600;font-size:14px;border:1px solid rgba(255,255,255,.28);background:none;color:#fff}.wb{background:#f1efec;color:#12151c;border-color:#f1efec}
.cl{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-top:auto;padding-top:10px}
.sbig{font-family:var(--serif);font-size:68px;line-height:.9;font-weight:400}.sbig sup{font-size:.5em;vertical-align:.75em;margin-left:2px}
.cap2{font-size:13px;color:#c3cbdb;margin-top:8px}
.rb2{width:46px;height:46px;border-radius:50%;border:1px solid rgba(255,255,255,.3);background:none;font-size:22px;line-height:1;padding:0;display:grid;place-items:center;flex:none}.rb2:active{background:var(--ac);color:#000}
.rbs{display:flex;gap:12px}
.md{display:flex;align-items:center;gap:20px;flex-wrap:wrap}
.art{width:68px;height:68px;border-radius:9px;background:rgba(255,255,255,.1);display:grid;place-items:center;font-size:28px;color:var(--ac);flex:none;overflow:hidden}.art img{width:100%;height:100%;object-fit:cover}
.mt{flex:1 1 200px;min-width:0}.mt .pc{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#aeb8cc;font-weight:600}
.mt .tt{font-family:var(--serif);font-size:30px;line-height:1.1;margin-top:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mt .ar{color:#b7c0d1;font-size:14px;margin-top:2px}
.mc{display:flex;align-items:center;gap:14px}.mc button{background:none;border:0;padding:6px;font-size:22px;color:#e6eaf2;display:grid;place-items:center}
.mc button.pp{width:54px;height:54px;border-radius:50%;background:#f1efec;color:#12151c;padding:0;font-size:22px}
.vol{display:flex;align-items:center;gap:10px;flex:1 1 150px;min-width:130px;color:#b7c0d1;font-size:16px}
/* ===== window / shutter / curtain cards ===== */
.win{position:relative;width:104px;aspect-ratio:3/4;flex:none;border-radius:10px;overflow:hidden;background:linear-gradient(180deg,#6fa8d8 0%,#bfdcf0 58%,#f3dcae 100%);box-shadow:0 10px 22px rgba(0,0,0,.38);touch-action:none;-webkit-user-select:none;user-select:none}
.win.cd{cursor:ns-resize}.win.cd.k-curtain{cursor:ew-resize}
.win .wg{position:absolute;inset:0;background:radial-gradient(circle at 72% 26%,#fff6c7 0 13%,rgba(255,246,199,0) 14%),radial-gradient(ellipse at 30% 105%,rgba(255,255,255,.35),transparent 60%)}
.win::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:4px;margin-left:-2px;background:#aeb3bf;z-index:1}
.win::after{content:"";position:absolute;left:0;right:0;top:46%;height:4px;background:#aeb3bf;z-index:1}
.win.night{background:linear-gradient(180deg,#0f1a3a 0%,#1e2f5c 60%,#31407a 100%)}
.win.night .wg{background:radial-gradient(circle at 72% 26%,#f4f1dc 0 9%,rgba(244,241,220,0) 10%),radial-gradient(circle at 20% 20%,#fff 0 1.5%,transparent 2%),radial-gradient(circle at 40% 45%,#fff 0 1.2%,transparent 2%),radial-gradient(circle at 12% 60%,#fff 0 1.2%,transparent 2%)}
.win .wc,.win .wl,.win .wr{position:absolute;z-index:2;transition:height .55s cubic-bezier(.3,.7,.2,1),width .55s cubic-bezier(.3,.7,.2,1)}
.win .wc{left:0;right:0;top:0;height:calc((100 - var(--p)) * 1%);background:repeating-linear-gradient(180deg,#e3e5ea 0 5px,#a4a8b3 5px 7px);border-bottom:4px solid #6e727e;box-shadow:0 8px 12px rgba(0,0,0,.35)}
.win.k-curtain .wc,.win.k-awning .wl,.win.k-awning .wr,.win.k-slats .wl,.win.k-slats .wr{display:none}
.win.k-curtain .wl,.win.k-curtain .wr{top:0;bottom:0;width:calc(13% + (100 - var(--p)) * .37%);background:repeating-linear-gradient(90deg,#d7c4ab 0 7px,#a8957c 7px 14px);box-shadow:inset -6px 0 10px rgba(0,0,0,.25)}
.win.k-curtain .wl{left:0}.win.k-curtain .wr{right:0;box-shadow:inset 6px 0 10px rgba(0,0,0,.25)}
.win.k-awning .wc{background:repeating-linear-gradient(90deg,#e8554e 0 12px,#f6f1ec 12px 24px);height:calc(14% + (100 - var(--p)) * .5%);border-bottom:0;border-radius:0 0 14px 14px;box-shadow:0 10px 14px rgba(0,0,0,.3)}
.win .wf{position:absolute;inset:0;border-radius:10px;box-shadow:inset 0 0 0 3px #dfe2e8,inset 0 0 0 5px #8b909c;z-index:4;pointer-events:none}
.win.mvg .wc,.win.mvg .wl,.win.mvg .wr{transition-duration:2.4s;transition-timing-function:linear}
.win.mini{width:100%;max-width:92px}
.wrow{display:flex;gap:12px;justify-content:space-around;margin:6px 0 4px}
.wm{display:flex;flex-direction:column;align-items:center;gap:6px;flex:1;min-width:0}
.wm .wn{font-size:12px;color:var(--mu);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.wm .wp{font-weight:600;font-size:13px}
.shg{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px;margin-top:6px}
.shc{display:flex;gap:18px;align-items:center;padding:16px}
.shc .shr{flex:1;min-width:0;display:flex;flex-direction:column;gap:6px}
.shc .nm{font-size:16px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.shc .st{font-size:12px;color:var(--mu)}
.shc .bigs{font-size:44px}.shc .bigs small{display:inline;font-size:13px;margin-left:6px}
.pre{display:flex;gap:5px;flex-wrap:wrap;margin-top:2px}
.pre button{padding:5px 9px;border-radius:999px;border:1px solid var(--bd);background:rgba(255,255,255,.05);font-size:11.5px;font-weight:500}
.pre button.on{background:var(--ac);color:#12151c;border-color:var(--ac)}.pre button:active{background:var(--ac);color:#000}
.shb{display:flex;gap:10px;margin-top:6px}
.shb button{width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.06);padding:0;display:grid;place-items:center;font-size:15px}
.shb button:active{background:var(--ac);color:#000}
.shc .tlt{margin-top:8px}.shc .tlt .lbl{margin-bottom:2px}
.shv{width:62px;height:70px;border:1px solid rgba(255,255,255,.35);border-radius:6px;overflow:hidden;flex:none;background:rgba(255,255,255,.04)}
.shv i{display:block;background:repeating-linear-gradient(#8f8f93 0 4px,#4f5157 4px 7px);transition:height .3s}
.bigs{font-family:var(--serif);font-size:48px;line-height:1;font-weight:400}.bigs small{display:block;font-family:inherit;font-size:14px;color:#c3cbdb;margin-top:6px}
.cen{display:flex;align-items:flex-start;gap:18px}
.btn3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:auto;padding-top:14px}
.btn3 button{padding:12px 6px;border-radius:8px;border:1px solid rgba(255,255,255,.28);background:none;font-size:14px;font-weight:500}.btn3 button:active{background:var(--ac);color:#000}
.cnt{font-family:var(--serif);font-size:56px;line-height:1}
/* ===== common cards (service pages / custom cards) ===== */
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(calc(250px * var(--tm,1)),1fr));gap:16px}
/* tile size (Settings): everything inside a tile or card is scaled by --z */
.bc,.grid>.kw,.grid>.cw,.grid>.tile,.grid>.card,.abody>.kw,.abody>.cw,.abody>.tile,.abody>.card{zoom:var(--z,1)}
.bc .kw,.bc .cw,.bc .tile,.bc .card{zoom:1}
.tile,.card{position:relative;background:var(--cd);border:1px solid var(--bd);border-radius:18px;padding:18px}
.tile{cursor:pointer;min-height:120px;display:flex;flex-direction:column;justify-content:space-between}
.tile:active{transform:scale(.98)}
.bdg{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;font-size:22px;flex:none;background:color-mix(in srgb,var(--c) 16%,transparent);color:var(--c);transition:.2s}
.card.on .bdg{background:var(--c);color:#10131c}
.num{font-size:38px;font-weight:300;line-height:1.05}.nm{font-weight:500;font-size:16px}
.card.on{border-color:rgba(232,201,143,.38)}
.row{display:flex;align-items:center;gap:14px}.grow{flex:1;min-width:0}
.st{color:var(--mu);font-size:13px;margin-top:2px;text-transform:capitalize}
.btns{display:flex;gap:8px;margin-top:14px}
.btns button{flex:1;background:rgba(255,255,255,.09);border:0;border-radius:12px;padding:11px;min-width:44px;transition:.15s}
.btns button:active{background:var(--ac);color:#000}
input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:20px;background:transparent;margin:0;outline:0}
input[type=range]::-webkit-slider-runnable-track{height:4px;border-radius:2px;background:rgba(255,255,255,.2)}
input[type=range]::-moz-range-track{height:4px;border-radius:2px;background:rgba(255,255,255,.2)}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;margin-top:-8px;border-radius:50%;background:var(--ac);border:2px solid #14110c;box-shadow:0 1px 6px #0008}
input[type=range]::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:var(--ac);border:2px solid #14110c}
.card input[type=range]{margin-top:14px}
.sw{width:46px;height:28px;border-radius:14px;background:#4b505b;position:relative;border:0;flex:none;transition:.2s;padding:0}
.sw::after{content:"";position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:#d7dae1;transition:.2s}
.sw.on{background:var(--ac)}.sw.on::after{left:21px;background:#15120d}
.big{font-size:44px;font-weight:200;margin-top:10px}
img.cam{width:100%;border-radius:14px;margin-top:12px;background:#000;aspect-ratio:16/9;object-fit:cover;cursor:pointer}
.cvw img.cam{margin:0;border-radius:0;aspect-ratio:auto}
.tabs{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap}.tabs button{display:flex;gap:7px;align-items:center;background:rgba(255,255,255,.07);border:1px solid var(--bd);border-radius:10px;padding:9px 18px}.tabs button.act{background:#f1efec;color:#12151c;border-color:#f1efec}
input[type=text],select{width:100%;background:rgba(0,0,0,.3);border:1px solid var(--bd);color:#eef2fa;border-radius:10px;padding:11px;font:inherit}
table{width:100%;border-collapse:collapse;font-size:14px}td{padding:8px 6px;border-bottom:1px solid var(--bd)}
.dot{display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--bad);margin-right:6px}.dot.ok{background:var(--ok)}
.cw{position:relative}.cwoff>.card,.cwoff>.cw{opacity:.4}.hdn{position:absolute;left:12px;bottom:8px;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--mu);pointer-events:none}.rm.eye{right:40px}.rm.pin{right:72px}.rm.pin.on{background:var(--ac);color:#1a1408;opacity:1}.ctile{padding:10px!important}.rm{position:absolute;top:8px;right:8px;width:26px;height:26px;border-radius:50%;border:0;background:rgba(0,0,0,.45);color:#fff;font-size:12px;opacity:.55;z-index:2}.rm:hover{opacity:1;background:var(--bad)}
.tile.add{min-height:96px;border-style:dashed;background:transparent;opacity:.85;align-items:flex-start}.lvw{grid-column:span 2}
.ov{position:fixed;inset:0;background:rgba(5,8,16,.7);display:grid;place-items:center;z-index:99;padding:16px}
.dlg{width:min(520px,100%);background:#141c2e;border:1px solid var(--bd);border-radius:24px;padding:24px;max-height:90vh;overflow:auto}.dlg input{margin-top:4px}
textarea{width:100%;min-height:96px;background:rgba(0,0,0,.3);border:1px solid var(--bd);color:#eef2fa;border-radius:10px;padding:11px;font:13px monospace;margin-top:4px}
.err{color:var(--bad);font-size:13px;min-height:18px;margin-top:6px}.pri{background:var(--ac)!important;color:#000!important;font-weight:600}
.rh{display:flex;align-items:center;gap:12px;margin:26px 0 12px}.rh .grow{cursor:pointer}.rn{font-family:var(--serif);font-size:30px;font-weight:400}.rb{margin:0}.rb button{flex:none;padding:8px 14px;font-size:13px}
.kw{position:relative}.kw,.cw{border-radius:18px;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}
.holding{animation:hold 2s linear forwards}@keyframes hold{from{box-shadow:0 0 0 0 transparent}to{box-shadow:0 0 0 5px var(--ac)}}
[data-sk],[data-k]{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.dtgt{outline:3px dashed var(--ac);outline-offset:3px}
.moving{opacity:.28;outline:2px dashed var(--ac);outline-offset:-2px}
.gh{position:fixed;left:0;top:0;z-index:140;pointer-events:none;will-change:transform}
.gh.carry{left:50%;top:auto;bottom:150px;transform:translateX(-50%) scale(.5)!important;transform-origin:bottom center;pointer-events:none}
.hint.hc{display:flex;align-items:center;gap:12px;pointer-events:auto}.hint.hc button{background:#12151c;color:#fff;border:0;border-radius:16px;padding:6px 14px;font-weight:600}
.gh>*{transform:scale(1.04) rotate(-1.2deg);opacity:.97;margin:0!important;height:auto!important;align-self:auto}
.gh>.bc,.gh>.tile,.gh>.card,.gh>.kw>*,.gh>.cw>*{box-shadow:0 26px 60px -12px #000d,0 0 0 3px var(--ac);background:#151b29!important}
.hint{position:fixed;left:50%;bottom:96px;transform:translateX(-50%);background:var(--ac);color:#000;padding:10px 18px;border-radius:24px;font-weight:600;z-index:130;white-space:nowrap}
ha-icon{--mdc-icon-size:24px;display:inline-flex}.tpl{cursor:pointer;min-height:96px}.tv{font-size:30px;font-weight:300;line-height:1.15;margin:4px 0 2px;word-break:break-word}
/* ===== rooms page ===== */
.area{display:grid;grid-template-columns:minmax(0,1fr);gap:18px;padding:22px 16px 20px;flex:1;align-content:start}
.rl{display:flex;flex-direction:column;min-width:0}
.rlist{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.rli{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:11px 14px;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid var(--bd);color:#e3e7ef;font-size:15px;text-align:left;flex:none;white-space:nowrap}
.rli.act{background:rgba(255,255,255,.16);border-color:rgba(255,255,255,.18)}
.rli small{color:var(--ac);font-weight:600;font-size:13px}.rli small.off{color:var(--mu)}
.rl .ft{display:none;margin-top:auto;padding-top:20px;color:#b9c2d3;font-size:13px}
.ah{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
.ah h1{font-size:46px;margin:0}
.seg.fl{margin:0 0 14px}
.rpv{width:84px;height:52px;border-radius:8px;object-fit:cover;background:rgba(255,255,255,.06);border:1px solid var(--bd);flex:none}
.ahb{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;flex:none}
.ob2{padding:11px 20px;border-radius:8px;border:1px solid rgba(255,255,255,.32);background:none;font-weight:600;font-size:14px;flex:none}
.chips{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;margin:16px 0}
.abody{display:grid;grid-template-columns:repeat(var(--abn,1),minmax(0,1fr));gap:16px;align-items:start;grid-auto-flow:row dense}
.lr{display:grid;grid-template-columns:minmax(70px,30%) minmax(0,1fr) 52px;align-items:center;gap:14px;padding:13px 0;border-top:1px solid var(--bd)}.lr:first-of-type{border-top:0}
.lr .ln{background:none;border:0;text-align:left;padding:0;font-size:15px;font-weight:500;color:#e6eaf2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lr .lp{text-align:right;font-size:14px;color:#c3cbdb}
.bc .grid{grid-template-columns:repeat(auto-fill,minmax(calc(230px * var(--tm,1)),1fr))}.bc .card{background:rgba(255,255,255,.05)}
.span2{grid-column:1/-1}
.tall{grid-row:span 2}
:host([data-dev="phone"]) .tall{grid-row:auto}

/* ===== lighting tile ===== */
.lts{display:flex;flex-direction:column;gap:16px}
.lt1{display:flex;align-items:center;justify-content:space-between;gap:12px}
.ltn{min-width:0}.ltn b{font-weight:500;font-size:15px;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ltn small{color:var(--mu);font-size:12px}
.lt input[type=range]{margin-top:10px}
.btn2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:auto;padding-top:16px}
.btn2 button{padding:11px 6px;border-radius:9px;border:1px solid rgba(255,255,255,.26);background:none;font-size:13px;font-weight:600}.btn2 button:active{background:var(--ac);color:#000}
.seg.sm{margin-top:12px;padding:3px}.seg.sm button{padding:8px 4px;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
/* ===== intercom ===== */
.aul{display:flex;flex-direction:column}
.aur{display:flex;align-items:center;gap:12px;padding:11px 0;border-top:1px solid var(--bd)}.aur:first-child{border-top:0}
.aur .nm2{font-size:15px;font-weight:600}.runb{width:34px;height:34px;border-radius:50%;font-size:12px;padding:0;flex:none}
.icgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:18px;align-items:start}
.icr{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}
.icb{display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 6px;border-radius:12px;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.06);font-size:12px;font-weight:600;line-height:1.1;text-align:center;transition:transform .15s,background .2s}
.icb .si{font-size:22px}.icb:active{transform:scale(.95)}
.icb.door{background:rgba(95,211,154,.16);border-color:rgba(95,211,154,.5);color:#a8f0cd}
.icb.door.armed{background:var(--warn);border-color:var(--warn);color:#1a1205;animation:armed .6s ease-in-out infinite alternate}
@keyframes armed{from{transform:scale(1)}to{transform:scale(1.04)}}
.bc.ringing{border-color:var(--ok);animation:ringg 1.1s ease-in-out infinite}
@keyframes ringg{0%,100%{box-shadow:0 0 0 0 rgba(95,211,154,.45)}50%{box-shadow:0 0 0 8px rgba(95,211,154,0)}}
.rg{color:var(--ok);font-weight:700;animation:blink 1s steps(2) infinite}@keyframes blink{50%{opacity:.35}}
.bc.icm .cvw{min-height:150px}
.bigic .cvw{min-height:340px}
.vic{display:flex;gap:10px;justify-content:center;padding:0 20px 6px}.vic .icb{flex-direction:row;gap:8px;padding:11px 20px;font-size:13px}
/* ===== scenes ===== */
.capr{display:flex;justify-content:space-between;align-items:center}
.caps{display:flex;gap:6px}
.mini{width:28px;height:28px;border-radius:8px;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.06);font-size:14px;line-height:1;padding:0;color:#dfe4ee;display:grid;place-items:center}
.mini.on{background:var(--ac);color:#000;border-color:var(--ac)}
.scw{position:relative;min-width:0}
.scx{position:absolute;right:4px;top:50%;transform:translateY(-50%);width:26px;height:26px;border-radius:50%;border:0;background:rgba(0,0,0,.45);color:#fff;font-size:12px;padding:0;z-index:2}.scx.r{right:34px}
.scg{max-height:240px;overflow-y:auto;scrollbar-width:thin}
.scn .hintx{font-size:13px;color:var(--mu);line-height:1.4}
.srow2{display:flex;align-items:center;gap:12px;padding:10px 12px;border:1px solid var(--bd);border-radius:12px;margin-bottom:6px;background:rgba(255,255,255,.04)}
.srow2 .nm2{font-size:14px;font-weight:500}
.dlg .gtl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--mu);margin:14px 0 6px;font-weight:600}
.swrow{display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 14px}
.dlg .shd{margin-bottom:10px}
/* ===== bottom bar ===== */
.rl .rcap{margin:18px 0 10px}
:host([data-wide="1"]) .rl .rcap{margin:40px 0 12px}
:host([data-wide="1"]) .cr{display:block}
:host([data-wide="1"]) .crm{display:none}
nav{position:sticky;bottom:0;z-index:5;display:flex;align-items:center;gap:10px;padding:8px 8px calc(8px + env(safe-area-inset-bottom));background:linear-gradient(180deg,rgba(14,19,30,.78),rgba(7,10,17,.9));-webkit-backdrop-filter:blur(22px) saturate(1.5);backdrop-filter:blur(22px) saturate(1.5);border-top:1px solid rgba(255,255,255,.12);box-shadow:0 -12px 40px -18px #000}
.tabs2{position:relative;display:flex;gap:2px;flex:1;min-width:0;overflow-x:auto;scrollbar-width:none;padding:2px 0}.tabs2::-webkit-scrollbar{display:none}
.tind{position:absolute;left:0;top:2px;bottom:2px;width:0;border-radius:12px;background:linear-gradient(180deg,#fbfaf8,#e9e6e1);box-shadow:0 6px 22px -6px var(--gl,#fff6),0 0 0 1px rgba(255,255,255,.35) inset;transition:transform .5s cubic-bezier(.25,1.25,.4,1),width .5s cubic-bezier(.25,1.25,.4,1),box-shadow .4s;pointer-events:none;z-index:0;will-change:transform,width}
nav button.t{position:relative;z-index:1;flex:1 1 0;min-width:58px;padding:7px 4px;border-radius:12px;border:0;background:none;color:#cfd5e2;font-size:10px;display:flex;flex-direction:column;align-items:center;gap:3px;white-space:nowrap;transition:color .3s,transform .15s}
nav button.t:active{transform:scale(.93)}
nav button.t .si{font-size:22px;transition:transform .3s}nav button.t ha-icon{--mdc-icon-size:22px}
nav button.t span{overflow:hidden;text-overflow:ellipsis;max-width:100%}
nav button.t.act{color:#12151c;font-weight:600}
nav button.t.act .si{color:var(--c,#12151c);animation:pop .55s cubic-bezier(.3,1.7,.5,1)}
@keyframes pop{0%{transform:scale(.5) translateY(4px)}100%{transform:none}}
@media(hover:hover){nav button.t:not(.act):hover{color:#fff;background:rgba(255,255,255,.07)}}
.nr{display:flex;align-items:center;gap:12px;flex:none;padding-left:10px}
.cr{letter-spacing:2px;font-size:11px;text-transform:uppercase;color:var(--mu);white-space:nowrap;display:none}
.gb{width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.04);display:grid;place-items:center;font-size:19px;padding:0;transition:background .2s,transform .15s,border-color .2s}.gb:active{transform:scale(.92)}
@media(hover:hover){.gb:hover{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.5)}}
.crm{text-align:center;letter-spacing:2px;font-size:11px;text-transform:uppercase;color:var(--mu);padding:10px 0 4px}
/* ===== camera viewer ===== */
.camv{position:fixed;inset:0;z-index:120;background:rgba(3,5,10,.985);display:flex;flex-direction:column}
.camv .vh{display:flex;align-items:center;gap:14px;padding:16px 20px}
.camv .vt{font-family:var(--serif);font-size:30px;line-height:1}
.hav{position:relative;overflow:hidden;pointer-events:none}.hav>*{display:block;width:100%;height:100%}.camv .hav{width:100%;height:100%;border-radius:12px}.wallh{position:absolute;inset:0}
.camv .vb{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding:0 20px}
.camv img{max-width:100%;max-height:100%;width:100%;height:100%;object-fit:contain;border-radius:12px;background:#000}
.camv .vf{display:flex;gap:8px;padding:14px 20px calc(16px + env(safe-area-inset-bottom));overflow-x:auto;justify-content:center;scrollbar-width:none}
.cc2{flex:none;padding:10px 16px;border-radius:9px;border:1px solid rgba(255,255,255,.25);background:none;font-size:13px;font-weight:500}.cc2.on{background:#f1efec;color:#12151c;border-color:#f1efec}
/* ===== settings page ===== */
.sbar{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin:6px 0 20px}
.sbar h1{font-size:56px;margin:0;line-height:1}
.sbar .sub{font-size:14px;margin:8px 0 0}
.sbtns{display:flex;gap:10px;flex-wrap:wrap}
.sbtn{border:0;border-radius:10px;padding:13px 22px;background:rgba(255,255,255,.14);color:#fff;font-weight:700;font-size:12px;letter-spacing:1.5px;text-transform:uppercase}
.sbtn.pri2{background:var(--ac);color:#000}
.sc .sbtn{padding:9px 16px;font-size:12px}
.sg{display:grid;grid-template-columns:270px minmax(0,1fr);gap:18px;align-items:start}
.snav{display:flex;flex-direction:column;gap:8px}
.sti{display:flex;gap:14px;align-items:center;text-align:left;width:100%;padding:14px 16px;border-radius:14px;border:1px solid var(--bd);background:rgba(255,255,255,.06)}
.sti.act{background:rgba(255,255,255,.2)}
.sti .si{font-size:22px;flex:none;color:#cfd6e6}
.sti b{display:block;font-size:16px;font-weight:600}.sti small{display:block;color:var(--mu);font-size:12px;margin-top:2px}
.ssec{background:var(--cd);border:1px solid var(--bd);border-radius:20px;padding:22px;margin-bottom:18px}
.shd{display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:14px;font-size:12px;letter-spacing:3px;text-transform:uppercase;font-weight:700}
.shd small{letter-spacing:0;text-transform:none;font-weight:400;color:var(--mu);font-size:12px;text-align:right}
.ulim{margin:-2px 0 10px 18px;padding-left:12px;border-left:2px solid var(--bd)}
.srow{display:grid;grid-template-columns:minmax(0,34%) minmax(0,1fr);gap:16px;align-items:center;background:rgba(255,255,255,.05);border:1px solid var(--bd);border-radius:14px;padding:12px 16px;margin-bottom:8px}
.sn{font-weight:600}.ss{color:var(--mu);font-size:12px;margin-top:2px;overflow-wrap:anywhere}
.sc{display:flex;gap:8px;align-items:center;flex-wrap:wrap;min-width:0}.sc>input[type=text],.sc>select{flex:1;min-width:120px}
.sc input[type=range]{flex:1;min-width:140px}.sc input[type=file]{color:var(--mu);font-size:13px;max-width:100%}
.ib2{background:rgba(255,255,255,.1);border:0;border-radius:10px;width:36px;height:36px;flex:none}.ib2:disabled{opacity:.3}
.swt{width:44px;height:44px;border-radius:50%;border:2px solid rgba(255,255,255,.18);cursor:pointer;padding:0;flex:none}.swt.sel{border-color:#fff;box-shadow:0 0 0 2px var(--ac)}
/* ===== screen sizes (set by JS from the panel width): phone / tablet / desktop, plus data-wide for the two-column layouts ===== */
:host([data-dev="phone"]) .brand{font-size:15px;letter-spacing:5px}
:host([data-dev="phone"]) .page{padding:18px 14px 20px}
:host([data-dev="phone"]) h1{font-size:36px}
:host([data-dev="phone"]) .clk{font-size:46px;margin-top:14px}
:host([data-dev="phone"]) .bc{padding:16px 16px 16px;border-radius:18px}
:host([data-dev="phone"]) .grid{grid-template-columns:repeat(var(--pc,2),minmax(0,1fr));gap:10px}
:host([data-dev="phone"]) .grid[data-grid^="list:cameras"]{grid-template-columns:minmax(0,1fr)!important}
:host([data-dev="phone"]) .bc .grid{grid-template-columns:repeat(var(--pc2,1),minmax(0,1fr))}
:host([data-dev="phone"]) .card{padding:14px;border-radius:16px}
:host([data-dev="phone"]) .rn{font-size:24px}
:host([data-dev="phone"]) .rh{flex-wrap:wrap;margin:20px 0 10px}
:host([data-dev="phone"]) .ov{place-items:end center;padding:0}
:host([data-dev="phone"]) .dlg{width:100%;max-height:92vh;border-radius:24px 24px 0 0}
:host([data-dev="phone"]) .hint{bottom:78px}
:host([data-dev="phone"]) .sg{grid-template-columns:minmax(0,1fr)}
:host([data-dev="phone"]) .snav{flex-direction:row;overflow-x:auto;padding-bottom:4px}
:host([data-dev="phone"]) .sti{width:auto;flex:none;white-space:nowrap;padding:10px 14px}
:host([data-dev="phone"]) .sti small{display:none}
:host([data-dev="phone"]) .srow{grid-template-columns:minmax(0,1fr);gap:8px}
:host([data-dev="phone"]) .sbar h1{font-size:38px}
:host([data-dev="phone"]) .sbtn{padding:11px 16px}
:host([data-dev="phone"]) .ssec{padding:16px;border-radius:18px}
:host([data-dev="phone"]) .ah h1{font-size:38px}
:host([data-dev="phone"]) .gr{font-size:30px}
:host([data-dev="phone"]) .lr{grid-template-columns:minmax(60px,28%) minmax(0,1fr) 44px;gap:10px}
:host([data-dev="phone"]) .camv .vt{font-size:24px}
:host([data-dev="tablet"]) .home,:host([data-dev="tablet"]) .area{padding:28px 28px 22px}
:host([data-dev="tablet"]) .page{padding:28px 28px 24px}
:host([data-dev="tablet"]) .clk{font-size:56px}
:host([data-dev="phone"]) .scg{grid-template-columns:repeat(2,minmax(0,1fr))}
:host([data-dev="tablet"]) .scg{grid-template-columns:repeat(3,minmax(0,1fr))}
:host([data-dev="tablet"]) nav{padding:10px 20px calc(10px + env(safe-area-inset-bottom))}
:host([data-dev="tablet"]) nav button.t,:host([data-dev="desktop"]) nav button.t{flex:none;flex-direction:row;font-size:15px;font-weight:500;padding:12px 20px;gap:0}
:host([data-dev="tablet"]) nav button.t .si,:host([data-dev="desktop"]) nav button.t .si,:host([data-dev="tablet"]) nav button.t ha-icon,:host([data-dev="desktop"]) nav button.t ha-icon{display:none}
:host([data-dev="desktop"]) nav{padding:12px 44px calc(12px + env(safe-area-inset-bottom))}
:host([data-dev="desktop"]) .home,:host([data-dev="desktop"]) .area{padding:40px 44px 28px}
:host([data-dev="desktop"]) .abody{gap:18px}
:host([data-dev="desktop"]) .scg{grid-template-columns:repeat(2,minmax(0,1fr))}
:host([data-dev="desktop"]) .camv .vh,:host([data-dev="desktop"]) .camv .vb,:host([data-dev="desktop"]) .camv .vf{padding-left:44px;padding-right:44px}
:host([data-wide="1"]) .home{grid-template-columns:minmax(300px,390px) minmax(0,1fr);gap:40px}
:host([data-wide="1"]) .scg{grid-template-columns:repeat(2,minmax(0,1fr))}
:host([data-wide="1"]) .hl{position:sticky;top:28px;align-self:start;height:max(calc(var(--vh) - 116px),540px)}
:host([data-dev="desktop"][data-wide="1"]) .hl{top:40px;height:max(calc(var(--vh) - 132px),540px)}
:host([data-wide="1"]) .clk{font-size:clamp(54px,4.6vw,72px);margin-top:34px}
:host([data-wide="1"]) .gr{font-size:36px;margin-top:34px}
:host([data-wide="1"]) .scn{margin-top:auto;padding-top:26px}
:host([data-wide="1"]) .area{grid-template-columns:minmax(220px,270px) minmax(0,1fr);gap:40px}
:host([data-wide="1"]) .rlist{flex-direction:column;overflow:visible}
:host([data-wide="1"]) .rli{width:100%;padding:13px 14px;background:none;border-color:transparent;font-size:16px}
:host([data-wide="1"]) .rli.act{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.12)}
:host([data-wide="1"]) .rl .ft{display:block}
:host([data-wide="1"]) .ah h1{font-size:clamp(46px,5vw,66px)}
:host([data-wide="1"]) .chips{grid-template-columns:repeat(4,minmax(0,1fr))}
`;

class QuintDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<style>${CSS}</style><div id="r"></div>`;
    this._root = this.shadowRoot.getElementById("r");
    this._tres = {}; this._tsub = {};
    this._v = { p: "home" };
    let c = {};
    try { c = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) {}
    this._c = { rooms: [], map: {}, hide: [], name: "", custom: {}, order: {}, ...c };
    this.shadowRoot.addEventListener("click", (e) => this._click(e));
    this.shadowRoot.addEventListener("change", (e) => this._change(e));
    this.shadowRoot.addEventListener("pointerdown", (e) => { if (e.target.type === "range") this._drag = true; });
    window.addEventListener("pointerup", () => { this._drag = false; });
    const R = this.shadowRoot;
    R.addEventListener("pointerdown", (e) => { if (!this._wdown(e)) this._pdown(e); });
    R.addEventListener("pointermove", (e) => { if (!this._wmove(e)) this._pmove(e); });
    R.addEventListener("pointerup", () => { if (!this._wup()) this._pup(); });
    R.addEventListener("pointercancel", () => { if (!this._wup()) this._pcancel(); });
    R.addEventListener("input", (e) => this._input(e));
    R.addEventListener("touchmove", (e) => { if (this._mv && !this._mv.carry) e.preventDefault(); }, { passive: false });
    R.addEventListener("contextmenu", (e) => { if (this._hold || this._mv) e.preventDefault(); });
    R.addEventListener("load", (e) => { const t = e.target; if (t && t.classList && t.classList.contains("camx")) t.dataset.ok = "1"; }, true);
    R.addEventListener("error", (e) => { const t = e.target; if (t && t.classList && t.classList.contains("camx") && !this._camFb) { this._camFb = true; if (t.dataset.snap) t.src = t.dataset.snap; } if (t && t.classList && t.classList.contains("wallx") && t.dataset.wid) { (this._wallFb = this._wallFb || new Set()).add(t.dataset.wid); this._last = null; this._draw(true); } }, true);
  }
  _pdown(e) {
    if (e.button > 0 || e.target.type === "range" || this._mv) return;
    const path = e.composedPath(), kk = path.find((n) => n.dataset && n.dataset.k), tp = path.find((n) => n.dataset && n.dataset.tpl), sk = kk ? null : path.find((n) => n.dataset && n.dataset.sk), k = kk || sk;
    if (!k || this._dlg || this._cam) return;
    this._lp = { x: e.clientX, y: e.clientY };
    this._hold = { k, x: e.clientX, y: e.clientY, id: e.pointerId, pt: e.pointerType, t: Date.now(), tpl: tp ? tp.dataset.tpl : "", sk: sk ? sk.dataset.sk : "" };
    if (!tp) { k.classList.add("holding"); this._ht = setTimeout(() => this._startMove(), HOLD_MS); }
  }
  _startMove() {
    if (!this._hold) return;
    const el = this._hold.k, r = el.getBoundingClientRect(), lp = this._lp || { x: this._hold.x, y: this._hold.y }, z = this._z || 1;
    el.classList.remove("holding"); el.classList.add("moving");
    try { el.setPointerCapture(this._hold.id); } catch (e) {}
    // the lifted copy floats under the finger; the original stays as a faded placeholder
    const gh = document.createElement("div"), cp = el.cloneNode(true);
    gh.className = "gh"; gh.style.width = r.width + "px";
    cp.classList.remove("moving", "holding", "dtgt"); ["data-k", "data-sk", "data-id"].forEach((a) => cp.removeAttribute(a));
    cp.style.zoom = z; cp.style.width = r.width / z + "px";
    gh.appendChild(cp); this.shadowRoot.appendChild(gh);
    const m = (this._mv = { el, sk: this._hold.sk || "", tgt: "", te: null, gh, pt: this._hold.pt, ox: lp.x - r.left, oy: lp.y - r.top });
    this._hold = null;
    gh.style.transform = `translate(${lp.x - m.ox}px,${lp.y - m.oy}px)`;
    m.as = setInterval(() => this._mvStep(), 30);
    if (navigator.vibrate) navigator.vibrate(40);
    this._hint("Drag onto the card whose place you want, then release");
  }
  _mvStep() {
    const m = this._mv, p = this._lp; if (!m || !p || m.carry) return;
    m.gh.style.transform = `translate(${p.x - m.ox}px,${p.y - m.oy}px)`;
    const box = this.getBoundingClientRect(), yy = p.y - box.top, edge = 90;   // scroll the page when the tile is near the top or bottom
    if (yy < edge) this.scrollTop -= Math.ceil((edge - Math.max(yy, 0)) / 5);
    else if (yy > box.height - edge) this.scrollTop += Math.ceil((yy - (box.height - edge)) / 5);
    const hit = this.shadowRoot.elementFromPoint(p.x, p.y);
    this.shadowRoot.querySelectorAll(".dtgt").forEach((x) => x.classList.remove("dtgt"));
    m.te = null; m.tgt = "";
    if (m.sk) {
      const t = hit && hit.closest && hit.closest("[data-sk]");
      if (t && t.dataset.sk !== m.sk) { m.te = t; m.tgt = t.dataset.sk; }
    } else {
      const t = hit && hit.closest && hit.closest("[data-k]");
      if (t && t !== m.el && t.parentNode === m.el.parentNode) m.te = t;
    }
    if (m.te) m.te.classList.add("dtgt");
  }
  _pmove(e) {
    this._lp = { x: e.clientX, y: e.clientY };
    if (this._hold && !this._mv) {
      if (Math.hypot(e.clientX - this._hold.x, e.clientY - this._hold.y) <= 12) return;
      if (this._hold.tpl && Date.now() - this._hold.t >= HOLD_MS) { clearTimeout(this._ht); this._startMove(); } else return this._cancelHold();
    }
    if (this._mv) this._mvStep();
  }
  _cancelHold() { clearTimeout(this._ht); if (this._hold) this._hold.k.classList.remove("holding"); this._hold = null; this._draw(); }
  _pup() {
    if (this._hold) {
      const h = this._hold;
      if (h.tpl && Date.now() - h.t >= 600) { this._sup = Date.now() + 500; this._details(this._findTpl(h.tpl)); }
      return this._cancelHold();
    }
    if (!this._mv || this._mv.carry) return;
    // a finger lifted over nothing keeps the tile in hand: tap the card where it should go
    if (this._mv.pt === "touch" && !this._mv.te) return this._carry();
    this._endMove(true);
  }
  _pcancel() {
    // on a phone the browser takes over the finger to scroll and cancels it: keep the tile in hand instead of dropping it
    if (this._mv) { if (!this._mv.carry && this._mv.pt === "touch") this._carry(); else if (!this._mv.carry) this._endMove(false); return; }
    this._pup();
  }
  _carry() {
    const m = this._mv; if (!m) return;
    clearInterval(m.as); m.carry = true; m.armed = Date.now() + 600;
    m.gh.classList.add("carry"); m.gh.style.transform = "";
    this.shadowRoot.querySelectorAll(".dtgt").forEach((x) => x.classList.remove("dtgt"));
    m.to = setTimeout(() => this._endMove(false), 90000);
    this._hint("Tap the card where it should go", true);
  }
  _carryClick(e) {
    const m = this._mv, path = e.composedPath();
    if (Date.now() < m.armed) return;
    if (path.some((n) => n.dataset && n.dataset.carry === "cancel")) return this._endMove(false);
    const t = m.sk ? path.find((n) => n.dataset && n.dataset.sk) : path.find((n) => n.dataset && n.dataset.k && n.parentNode === m.el.parentNode);
    if (!t) return;
    if (t === m.el) return this._endMove(false);
    m.te = t; m.tgt = m.sk ? t.dataset.sk : "";
    this._endMove(true);
  }
  _endMove(apply) {
    const m = this._mv; if (!m) return;
    clearInterval(m.as); clearTimeout(m.to); m.gh.remove();
    const el = m.el, grid = el.parentNode;
    el.classList.remove("moving");
    this.shadowRoot.querySelectorAll(".dtgt").forEach((x) => x.classList.remove("dtgt"));
    if (apply) {
      if (m.sk) { if (m.tgt) this._svcMove(m.sk, m.tgt); }
      else if (m.te) {
        grid.insertBefore(el, m.te.compareDocumentPosition(el) & 2 ? m.te.nextSibling : m.te);   // the card takes the place of the one it was dropped on
        const ctx = grid.dataset.grid; if (ctx) this._ordSet(ctx, Array.from(grid.children).filter((c) => c.dataset && c.dataset.k).map((c) => c.dataset.k));
      }
    }
    this._mv = null; this._sup = Date.now() + 400; this._hint("");
    this._last = null; this._draw(true);
  }
  _hint(t, cancel) {
    const old = this.shadowRoot.getElementById("hint"); if (old) old.remove();
    if (!t) return;
    const h = document.createElement("div"); h.id = "hint"; h.className = "hint"; h.textContent = t;
    if (cancel) { const b = document.createElement("button"); b.textContent = "Cancel"; b.dataset.carry = "cancel"; h.appendChild(b); h.classList.add("hc"); }
    this.shadowRoot.appendChild(h);
  }
  _relevant(h) {
    if (Object.keys(h.states).length !== this._n) return true;
    for (const id of this._track) if (h.states[id] !== this._seen[id]) return true;
    return false;
  }
  _attrs(o, n) {
    const nt = (u) => (u || "").replace(/([?&])token=[^&]*&?/, "$1").replace(/[?&]$/, "");
    const keepSrc = o.tagName === "IMG" && nt(o.getAttribute("data-src")) === nt(n.getAttribute("data-src"));
    const ks = o.hasAttribute("data-ks");
    for (const a of Array.from(n.attributes)) {
      if ((keepSrc && a.name === "src") || (ks && a.name === "style")) continue;
      if (o.getAttribute(a.name) !== a.value) o.setAttribute(a.name, a.value);
    }
    for (const a of Array.from(o.attributes)) {
      if ((keepSrc && a.name === "src") || (ks && a.name === "style")) continue;
      if (!n.hasAttribute(a.name)) o.removeAttribute(a.name);
    }
  }
  _kof(x) { return x.nodeType === 1 ? x.getAttribute("data-k") || x.getAttribute("data-id") : null; }
  _patch(o, n, act) {
    if (n.nodeType === 3) { if (o.nodeValue !== n.nodeValue) o.nodeValue = n.nodeValue; return; }
    if (n.nodeType !== 1) return;
    if (o.hasAttribute("data-hl")) return;
    if (o.hasAttribute("data-lv")) { const v = n.getAttribute("data-lv"); if (o.getAttribute("data-lv") !== v) o.setAttribute("data-lv", v); return; }
    this._attrs(o, n);
    this._morph(o, n);
    if (o === act) return;
    if (o.tagName === "INPUT" && (o.type === "range" ? !this._drag : o.hasAttribute("data-rname") || o.hasAttribute("data-fname") || o.hasAttribute("data-uname"))) o.value = n.getAttribute("value") ?? "";
    if (o.tagName === "SELECT") { const sel = n.querySelector("option[selected]"); o.value = sel ? sel.value : ""; }
  }
  _morph(from, to) {
    const act = this.shadowRoot.activeElement, pool = new Map(), used = new Set();
    Array.from(from.childNodes).forEach((o) => { const k = this._kof(o); if (k) pool.set(k, o); });
    let cur = from.firstChild;
    Array.from(to.childNodes).forEach((n) => {
      const k = this._kof(n);
      let o = null, cand = null;
      if (k) { o = pool.get(k) || null; if (o) pool.delete(k); }
      else {
        cand = cur;
        while (cand && (used.has(cand) || this._kof(cand))) cand = cand.nextSibling;
        if (cand && cand.nodeType === n.nodeType && cand.nodeName === n.nodeName) o = cand;
      }
      if (o) {
        if (o === cur) cur = cur.nextSibling; else from.insertBefore(o, cur);
        used.add(o); this._patch(o, n, act); return;
      }
      const c = n.cloneNode(true);
      if (cand === cur && cand) { const nx = cur.nextSibling; from.replaceChild(c, cur); cur = nx; }
      else { from.insertBefore(c, cur); if (cand) from.removeChild(cand); }
      used.add(c);
    });
    Array.from(from.childNodes).forEach((x) => { if (!used.has(x)) from.removeChild(x); });
  }
  _h2() {
    if (this._h2v === undefined) {
      try { const e = performance.getEntriesByType("resource").find((x) => x.name.startsWith(location.origin) && x.nextHopProtocol); if (e) this._h2v = /^h[23]/.test(e.nextHopProtocol); } catch (e) {}
    }
    return !!this._h2v;
  }
  _haOn() {
    if (this._haOff === undefined) { try { this._haOff = localStorage.getItem("quint_haoff") === "1"; } catch (e) { this._haOff = false; } }
    return (this._c.eng || "auto") !== "std" && !this._haOff && typeof window.loadCardHelpers === "function";
  }
  _haHost(id, wall, snap) {
    const E = (t) => this._esc(t);
    return `<div class="hav ${wall ? "wallh" : ""}" data-id="ha:${wall ? "w:" : ""}${E(id)}" data-hl="1" data-ha="${E(id)}" style="background:#000 url('${E(snap)}') center/${wall ? "cover" : "contain"} no-repeat"></div>`;
  }
  _deep(root, sel) {
    const f = root.querySelector(sel); if (f) return f;
    for (const e of root.querySelectorAll("*")) { if (e.shadowRoot) { const r = this._deep(e.shadowRoot, sel); if (r) return r; } }
    return null;
  }
  async _mountHa() {
    if (!this._haOn()) return;
    const hosts = Array.from(this.shadowRoot.querySelectorAll(".hav[data-ha]")).filter((h) => !h._m);
    if (!hosts.length) return;
    hosts.forEach((h) => (h._m = true));
    let hp = null; try { hp = await window.loadCardHelpers(); } catch (e) {}
    if (!hp) { this._haFail("api"); return; }
    for (const h of hosts) {
      if (!h.isConnected) continue;
      const id = h.dataset.ha, wall = h.classList.contains("wallh");
      if (wall && hosts.length > 3) await new Promise((r) => setTimeout(r, 250));
      try {
        const card = await hp.createCardElement({ type: "picture-entity", entity: id, camera_view: "live", show_name: false, show_state: false, tap_action: { action: "none" }, hold_action: { action: "none" }, fit_mode: wall ? "cover" : "contain" });
        card.hass = this._h;
        ["--ha-card-border-radius:0", "--ha-card-box-shadow:none", "--ha-card-border-width:0", "--ha-card-background:transparent", "display:block", "width:100%", "height:100%"].forEach((x) => { const [k, v] = x.split(":"); card.style.setProperty(k, v); });
        if (!h.isConnected) continue;
        h._card = card; h.appendChild(card); this._haWatch(h, id, wall ? 28 : 12);
      } catch (e) { this._haFail(id); }
    }
  }
  _haWatch(h, id, lim) {
    let n = 0;
    const iv = setInterval(() => {
      n++;
      if (!h.isConnected) return clearInterval(iv);
      const v = this._deep(h, "video"), im = this._deep(h, "img");
      if ((v && v.readyState >= 2 && !v.paused && v.currentTime > 0) || (im && im.complete && im.naturalWidth > 0)) { clearInterval(iv); this._haOkN = (this._haOkN || 0) + 1; return; }
      if (n >= (lim || 12)) { clearInterval(iv); this._haFail(id); }
    }, 1000);
  }
  _haFail(id) {
    (this._haBad = this._haBad || new Set()).add(id);
    if (!this._haOkN && (this._haBad.size >= 2 || id === "api")) { this._haOff = true; try { localStorage.setItem("quint_haoff", "1"); } catch (e) {} }
    this._last = null; this._draw(true);
  }
  _snapLoad(img, base, cb) {
    const u = base + (base.includes("?") ? "&" : "?") + "t=" + Date.now();
    const old = img._obj, swap = (src, obj) => {
      const go = () => {
        img._obj = obj || null;
        if (old) img.addEventListener("load", () => URL.revokeObjectURL(old), { once: true });
        img.src = src; cb(true);
      };
      const d = new Image(); d.src = src;
      if (d.decode) d.decode().then(go, go); else go();
    };
    if (this._noFetch || typeof fetch !== "function") { const t = new Image(); t.onload = () => swap(u, null); t.onerror = () => cb(false); t.src = u; return; }
    const ac = typeof AbortController !== "undefined" ? new AbortController() : null, to = setTimeout(() => ac && ac.abort(), 12000);
    fetch(u, { cache: "no-store", signal: ac ? ac.signal : undefined }).then((r) => { if (!r.ok) throw new Error("http"); return r.blob(); })
      .then((bl) => { clearTimeout(to); swap(URL.createObjectURL(bl), true); })
      .catch((e) => { clearTimeout(to); if (e && e.name === "TypeError") this._noFetch = true; cb(false); });
  }
  _refreshCams() {
    if (document.hidden || this._cam) return;
    const wall = this._v && this._v.p === "camwall", now = Date.now(), vh = window.innerHeight || 800;
    const n = this.shadowRoot.querySelectorAll(".wallg .wt").length;
    const gap = wall ? (n <= 4 ? 1200 : n <= 9 ? 2200 : n <= 16 ? 3200 : 4500) : 3000;
    let busy = 0;
    const list = Array.from(this.shadowRoot.querySelectorAll("img.cam[data-src]"));
    list.forEach((img) => { if (img._busy && now - img._busy > 12000) { img._busy = 0; } if (img._busy) busy++; });
    const cap = wall ? (n <= 8 ? 2 : 3) : 4;
    list.filter((img) => !img._busy && (img._due || 0) <= now).sort((a, b) => (a._due || 0) - (b._due || 0)).forEach((img) => {
      if (busy >= cap) return;
      const r = img.getBoundingClientRect();
      if (r.bottom < -150 || r.top > vh + 150 || (!r.width && !r.height)) return;
      img._busy = now; busy++;
      this._snapLoad(img, img.dataset.src, (ok) => { img._busy = 0; img._due = Date.now() + (ok ? gap : 5000); });
    });
  }
  _layout() {
    const w = this.clientWidth || window.innerWidth || 1024, auto = w < 600 ? "phone" : w < 1200 ? "tablet" : "desktop";
    let dev = localStorage.getItem("quint_dev") || "auto";
    if (!["phone", "tablet", "desktop"].includes(dev)) dev = auto;
    const wide = dev !== "phone" && w >= 900 ? "1" : "0";
    if (this.getAttribute("data-dev") !== dev) this.setAttribute("data-dev", dev);
    if (this.getAttribute("data-wide") !== wide) this.setAttribute("data-wide", wide);
    if (this.getAttribute("data-nav") !== "bar") this.setAttribute("data-nav", "bar");
    this._applyTs();
    if (this._auto !== auto || this._w !== w) { this._auto = auto; this._w = w; this._slide(); if (this._loaded && this._v.p === "home" && this._cols() !== this._colsN) this._draw(true); if (this._loaded && this._v.p === "camwall") this._draw(true); }
  }
  _slide() {
    try {
      const tb = this.shadowRoot.querySelector(".tabs2"), ind = tb && tb.querySelector(".tind"), a = tb && tb.querySelector("button.t.act");
      if (!ind) return;
      if (!a || !a.offsetWidth) { ind.style.opacity = "0"; return; }
      const first = !this._slid; this._slid = true;
      if (first) ind.style.transition = "none";
      ind.style.opacity = "1"; ind.style.width = a.offsetWidth + "px"; ind.style.transform = `translateX(${a.offsetLeft}px)`; ind.style.setProperty("--gl", (a.dataset.c || "#e8c98f") + "99");
      if (first) { void ind.offsetWidth; ind.style.transition = ""; }
      if (tb.scrollWidth > tb.clientWidth + 2) tb.scrollTo({ left: Math.max(0, a.offsetLeft - (tb.clientWidth - a.offsetWidth) / 2), behavior: first ? "auto" : "smooth" });
    } catch (e) {}
  }
  _time() { return this._clock(); }
  connectedCallback() {
    this._applyBg(); this._layout();
    if (typeof ResizeObserver !== "undefined") { this._ro = new ResizeObserver(() => this._layout()); this._ro.observe(this); }
    this._kd = (e) => { if (e.key === "Escape" && this._cam) { this._cam = null; this._camFb = false; this._draw(true); } };
    window.addEventListener("keydown", this._kd);
    this._iv2 = setInterval(() => { this._refreshCams(); }, 700); this._iv5 = setInterval(() => { if (this._h && this._ics().some((x) => x.bell && x.bell.startsWith("event."))) this._draw(); }, 5000);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => this._slide());
    this._iv3 = setInterval(() => {
      if (!this._cam) { this._camId = null; return; }
      if (document.hidden) return;
      const img = this.shadowRoot.querySelector("img.camx"); if (!img || !img.dataset.snap) return;
      if (!this._camFb) { if (!img.dataset.ok && Date.now() - (this._camSince || 0) > 9000) { this._camFb = true; this._draw(true); } return; }
      if (img._busy && Date.now() - img._busy < 8000) return;
      img._busy = Date.now(); this._snapLoad(img, img.dataset.snap, () => { img._busy = 0; });
    }, 1000);
    this._iv = setInterval(() => { const r = this.shadowRoot; this._tickClock(); const m = r.querySelector(".tm"); if (m) m.textContent = this._time(); }, 1000);
  }
  disconnectedCallback() { clearInterval(this._iv4); clearInterval(this._iv); clearInterval(this._iv2); clearInterval(this._iv3); clearInterval(this._iv5); window.removeEventListener("keydown", this._kd); if (this._ro) { this._ro.disconnect(); this._ro = null; } Object.values(this._tsub || {}).forEach((p) => p.then((u) => u()).catch(() => {})); this._tsub = {}; this._conn = null; }
  set panel(p) { this._title = (p && p.config && p.config.title) || "Quint"; }
  set narrow(n) { if (n === this._narrow) return; this._narrow = n; this._draw(true); }
  set route(r) {}
  setConfig(config) { this._title = (config && config.title) || "Quint"; }
  getCardSize() { return 12; }
  static getStubConfig() { return { title: "Quint" }; }

  set hass(h) {
    this._h = h;
    if (!this._loading) { this._loading = true; this._loadCfg(); }
    if (this._lvc) Object.values(this._lvc).forEach((e) => (e.hass = h));
    if (this.shadowRoot) this.shadowRoot.querySelectorAll("[data-hl]").forEach((x) => { if (x._card) x._card.hass = h; });
    if (this._loaded && h.connection !== this._conn) { this._conn = h.connection; this._tsub = {}; this._syncTpl(); }
    if (!this._c.rooms.length && h.areas && Object.keys(h.areas).length) this._importRooms(false);
    if (this._loaded && this._track && !this._relevant(h)) return;
    if (this._pending) return;
    this._pending = setTimeout(() => { this._pending = null; this._draw(); }, 250);
  }

  /* ---------- helpers ---------- */
  _save(now) {
    localStorage.setItem(KEY, JSON.stringify(this._c));
    if (this._v.p === "settings" && !now) { this._dirty = true; return; }
    if (now) { this._dirty = false; this._snap = JSON.stringify(this._c); }
    this._push();
  }
  _push() {
    if (!this._h || !this._srv) return;
    clearTimeout(this._st);
    this._st = setTimeout(() => this._h.callApi("POST", "quint/config", this._c).catch(() => {}), 300);
  }
  _revert() {
    try { const pm = { perms: this._c.perms, manager: this._c.manager, upInstall: this._c.upInstall, upRestart: this._c.upRestart }; this._c = { ...FRESH(), ...JSON.parse(this._snap), ...pm }; } catch (e) {}
    localStorage.setItem(KEY, JSON.stringify(this._c));
    this._dirty = false; this._applyBg(); this._syncTpl();
  }
  _toast(t) { this._hint(t); clearTimeout(this._tt); this._tt = setTimeout(() => this._hint(""), 1800); }
  _bgu() { try { return JSON.parse(localStorage.getItem("quint_bgu") || "null"); } catch (e) { return null; } }
  _applyBg() {
    if (this._rbgOn) { this.style.setProperty("--qbg-img", `url("${this._rbgOn}")`); this.style.setProperty("--qbg-dim", "0.5"); this.style.setProperty("--qbg-blur", "0px"); return; }
    const u = this._bgu(), b = { preset: "midnight", mode: "preset", dim: 0, blur: 0, ...(u || this._c.bg || {}) }, data = u ? u.data : this._bgData;
    const img = b.mode === "image" && data ? `url("${data}")` : BG[b.preset] || BG.midnight;
    this.style.setProperty("--qbg-img", img);
    this.style.setProperty("--qbg-dim", String(Math.max(0, Math.min(80, +b.dim || 0)) / 100));
    this.style.setProperty("--qbg-blur", Math.max(0, Math.min(20, +b.blur || 0)) + "px");
  }
  _loadBg() {
    this._h.callApi("GET", "quint/roomimg").then((d) => { this._rsrv = d && typeof d === "object" ? d : {}; this._draw(); }).catch(() => {});
    this._h.callApi("GET", "quint/background").then((d) => { this._bgData = (d && d.data) || ""; this._applyBg(); this._draw(); }).catch(() => {});
  }
  _bgLocal(patch) {
    try {
      let u = this._bgu();
      if (!u) { const b = { preset: "midnight", mode: "preset", dim: 0, blur: 0, ...(this._c.bg || {}) }; u = { ...b }; if (b.mode === "image" && this._bgData) u.data = this._bgData; else u.mode = "preset"; }
      localStorage.setItem("quint_bgu", JSON.stringify({ ...u, ...patch }));
    } catch (e) { this._toast("Not enough space to save the picture"); }
    this._applyBg();
  }
  async _pickBg(file) {
    try {
      const url = URL.createObjectURL(file), img = new Image();
      await new Promise((ok, no) => { img.onload = ok; img.onerror = no; img.src = url; });
      const sc = Math.min(1, 1920 / Math.max(img.width, img.height)), cv = document.createElement("canvas");
      cv.width = Math.round(img.width * sc); cv.height = Math.round(img.height * sc);
      cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
      URL.revokeObjectURL(url);
      const data = cv.toDataURL("image/jpeg", 0.8);
      await this._h.callApi("POST", "quint/background", { data });
      this._bgData = data;
      this._c.bg = { dim: 35, ...(this._c.bg || {}), mode: "image" };
      this._save(); this._applyBg(); this._draw(true); this._toast("Photo uploaded — press Save");
    } catch (e) { this._toast("Could not use that photo"); }
  }
  _importCfg(o) {
    const c = this._c;
    (o.rooms || []).forEach((r) => { if (r && r.id && !c.rooms.some((x) => x.id === r.id)) c.rooms.push(r); });
    Object.assign(c.map, o.map || {}); c.hide = [...new Set([...(c.hide || []), ...(o.hide || [])])];
    Object.entries(o.custom || {}).forEach(([k, a]) => { c.custom[k] = c.custom[k] || []; (a || []).forEach((it) => { if (it && !c.custom[k].some((x) => x.uid && x.uid === it.uid)) c.custom[k].push(it); }); });
    c.order = { ...(c.order || {}), ...(o.order || {}) };
    ["name", "title", "bg", "pills"].forEach((k) => { if (o[k]) c[k] = o[k]; });
    if (typeof o.credit === "string") c.credit = o.credit;
    if (o.tiles) c.tiles = { ...(c.tiles || {}), ...o.tiles };
    if (o.intercoms) c.intercoms = o.intercoms; else if (o.intercom) { c.intercoms = [{ id: "ic1", ...o.intercom }]; delete c.intercom; }
    if (Array.isArray(o.scenes)) o.scenes.forEach((x) => { if (x && x.id && !(c.scenes || []).some((y) => y.id === x.id)) (c.scenes = c.scenes || []).push(x); });
    ["noClock", "noScenes", "noWeather", "noRooms"].forEach((k) => { if (typeof o[k] === "boolean") c[k] = o[k]; });
    if (TSIZES[o.tsz]) c.tsz = o.tsz;
    if (o.eng === "std" || o.eng === "auto") c.eng = o.eng;
    if (o.cks === "analog" || o.cks === "digital") c.cks = o.cks;
    if (typeof o.clockTile === "boolean") c.clockTile = o.clockTile;
    if (o.wall && typeof o.wall === "object") c.wall = o.wall;
    c.svcTitle = { ...(c.svcTitle || {}), ...(o.svcTitle || {}) };
    c.svcHide = [...new Set([...(c.svcHide || []), ...(o.svcHide || [])])];
    if (o.svcOrder) c.svcOrder = o.svcOrder;
    this._save(); this._applyBg(); this._syncTpl(); this._draw(true);
  }
  _swap(arr, i, d) { const j = i + d; if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; }
  _sact(a, v) {
    const c = this._c;
    if (a === "icsel") { this._icSel = +v; return this._draw(true); }
    if (a === "rdsel") { this._rd = v; return this._draw(true); }
    if (a === "save") { this._push(); this._dirty = false; this._snap = JSON.stringify(c); this._toast("Saved"); this._draw(true); return; }
    if (a === "close") { if (this._dirty && !confirm("Discard unsaved changes?")) return; if (this._dirty) this._revert(); return this._nav("home"); }
    if (a === "reset") {
      if (!confirm("Reset everything? Rooms, device assignments, titles and custom cards are cleared. Press Close afterwards to undo, or Save to keep it.")) return;
      this._c = FRESH(); this._importRooms(false); this._applyBg(); this._syncTpl(); this._save(); this._draw(true); return;
    }
    if (a === "export") {
      const al = document.createElement("a"); al.href = URL.createObjectURL(new Blob([JSON.stringify({ quint: VER, ...c }, null, 2)], { type: "application/json" }));
      al.download = "quint-settings.json"; al.click(); setTimeout(() => URL.revokeObjectURL(al.href), 2000); return;
    }
    if (a === "bgp") c.bg = { ...(c.bg || {}), preset: v, mode: "preset" };
    else if (a === "bgm") c.bg = { ...(c.bg || {}), mode: "image" };
    else if (a === "bgx") { this._h.callApi("DELETE", "quint/background").catch(() => {}); this._bgData = ""; c.bg = { ...(c.bg || {}), mode: "preset" }; }
    else if (a === "svcvis") c.svcHide = (c.svcHide || []).includes(v) ? c.svcHide.filter((x) => x !== v) : [...(c.svcHide || []), v];
    else if (a === "svcup" || a === "svcdn") { const full = this._svcsAll(), ci = full.indexOf("clock"), l = this._svcsList(); this._swap(l, l.indexOf(v), a === "svcup" ? -1 : 1); if (ci >= 0) l.splice(Math.min(ci, l.length), 0, "clock"); c.svcOrder = l; }
    else if (a === "rup" || a === "rdn") this._swap(c.rooms, +v, a === "rup" ? -1 : 1);
    else if (a === "fup" || a === "fdn") this._swap(c.floors, +v, a === "fup" ? -1 : 1);
    else if (a === "pill") { const P = c.pills || ["lights", "climate", "security"]; c.pills = P.includes(v) ? P.filter((x) => x !== v) : [...P, v]; }
    else if (a === "tile") { const i = v.indexOf("|"), k = v.slice(0, i), id = v.slice(i + 1); c.tiles = c.tiles || {}; const cur = new Set(this._tileIds(k)); cur.has(id) ? cur.delete(id) : cur.add(id); c.tiles[k] = [...cur]; }
    else if (a === "tileauto") { if (c.tiles) delete c.tiles[v]; }
    else if (a === "icflag") { const ic = this._icCur(); if (ic) ic[v] = !ic[v]; }
    else if (a === "auto") { const l = new Set(c.autos || []); l.has(v) ? l.delete(v) : l.add(v); c.autos = [...l]; }
    else if (a === "autoclear") c.autos = [];
    else if (a === "icadd") { this._ics().push({ id: "ic" + Date.now().toString(36) }); this._icSel = this._ics().length - 1; }
    else if (a === "icdel") { const l = this._ics(); l.splice(this._icSel || 0, 1); this._icSel = Math.max(0, Math.min(this._icSel || 0, l.length - 1)); }
    else if (a === "wall") {
      const w = (c.wall = c.wall || {}), i = v.indexOf("|"), k = i < 0 ? v : v.slice(0, i), id = i < 0 ? "" : v.slice(i + 1);
      if (k === "live") w.live = w.live === false;
      else if (k === "max") w.max = +id || 0;
      else if (k === "names") w.names = w.names === false;
      else if (k === "cam") { const l = new Set(w.ids || []); l.has(id) ? l.delete(id) : l.add(id); w.ids = [...l]; }
      else if (k === "auto") w.ids = [];
      else if (k === "up" || k === "dn") { const l = [...(w.ids || [])], j = l.indexOf(id); if (j >= 0) { this._swap(l, j, k === "up" ? -1 : 1); w.ids = l; } }
    }
    else if (a === "tsz") { if (TSIZES[v]) c.tsz = v; }
    else if (a === "cks") c.cks = v === "analog" ? "analog" : "digital";
    else if (a === "ctile") c.clockTile = !c.clockTile;
    else if (a === "eng") { c.eng = v === "std" ? "std" : "auto"; this._haOff = false; this._haBad = new Set(); this._haOkN = 0; try { localStorage.removeItem("quint_haoff"); } catch (e) {} this._last = null; }
    else if (a === "clk") c.noClock = !c.noClock;
    else if (a === "flag" && ["noClock", "noScenes", "noWeather", "noRooms", "dflt", "lock"].includes(v)) c[v] = !c[v];
    else if (a === "srsel") { this._sr = v; return this._draw(true); }
    else if (a === "srt" || a === "srempty" || a === "srall") {
      const sv = this._svcsAll().filter((k) => k !== "intercom" && k !== "automations" && k !== "camwall" && k !== "clock"), cur = sv.includes(this._sr) ? this._sr : sv[0]; if (!cur) return;
      const rh = (c.roomHide = c.roomHide || {}), l = new Set(rh[cur] || []), rs = (c.rooms || []).filter((r) => r.on !== false);
      if (a === "srt") l.has(v) ? l.delete(v) : l.add(v);
      else if (a === "srall") l.clear();
      else rs.forEach((r) => { if (!(isCs(cur) ? this._csItems(r.id, cur).length : this._ents(cur, r.id).length)) l.add(r.id); });
      if (l.size) rh[cur] = [...l]; else delete rh[cur];
    }
    else if (a === "rdall") {
      const rid = this._rd || ((c.rooms || []).find((r) => r.on !== false) || {}).id, ids = Object.keys(this._h.states).filter((i) => this._svcOf(i) && this._roomOf(i) === rid);
      c.hide = v === "hide" ? [...new Set([...(c.hide || []), ...ids])] : (c.hide || []).filter((x) => !ids.includes(x));
    }
    else if (a === "rdadd") { const rid = this._rd || ((c.rooms || []).find((r) => r.on !== false) || {}).id; if (rid) c.map[v] = rid; }
    else if (a === "lockuser") { const l = new Set(c.lockUsers || []); l.has(v) ? l.delete(v) : l.add(v); c.lockUsers = [...l]; }
    else return;
    this._save(); this._applyBg(); this._draw(true);
  }
  _input(e) {
    const t = e.target, d = t.dataset;
    if (d.bg && this._admin()) { this._c.bg = { ...(this._c.bg || {}), [d.bg]: +t.value }; this._applyBg(); }
    if (d.sdq !== undefined && this._sd) { this._sd.q = t.value.toLowerCase(); this._draw(true); }
    if (d.pbr) { this._bgLocal({ [d.pbr]: +t.value }); }
    if (d.dfilter !== undefined) { this._dflt = t.value; this._draw(true); }
  }
  async _loadCfg() {
    try {
      const d = await this._h.callApi("GET", "quint/config");
      this._srv = true;
      if (d && Object.keys(d).length) { this._c = { rooms: [], map: {}, hide: [], name: "", custom: {}, order: {}, ...d }; localStorage.setItem(KEY, JSON.stringify(this._c)); }
      else if (this._c.rooms.length) this._save();
    } catch (e) {}
    let ch = false;
    Object.values(this._c.custom).flat().forEach((it) => { if (!it.uid) { it.uid = this._uid(); ch = true; } });
    if (ch && this._admin()) this._save();
    if (this._h && !this._c.rooms.length) this._importRooms(false);
    this._loaded = true;
    this._conn = this._h.connection; this._syncTpl();
    this._verCheck(); clearInterval(this._iv4); this._iv4 = setInterval(() => this._verCheck(), 300000);
    try { this._conn.addEventListener("ready", () => setTimeout(() => this._verCheck(), 1500)); } catch (e) {}
    this._applyBg(); this._loadBg();
    this._applyFull(); this._draw(true);
  }
  /* ---------- updates ---------- */
  _verCheck() {
    if (!this._h || !this._h.callApi) return;
    this._h.callApi("GET", "quint/version").then((d) => {
      if (!d || !d.running || d.running === VER) { try { sessionStorage.removeItem("quint_rl"); } catch (e) {} return; }
      let tried = ""; try { tried = sessionStorage.getItem("quint_rl") || ""; } catch (e) {}
      if (tried === d.running) return;
      try { sessionStorage.setItem("quint_rl", d.running); } catch (e) {}
      this._toast("Quint " + d.running + " is ready, reloading…");
      setTimeout(() => this._reload(), 1200);
    }).catch(() => {});
  }
  _reload() { location.reload(); }
  _upLoad(force) {
    if (this._upBusy || (this._up && !force)) return;
    this._upBusy = true;
    this._h.callApi("GET", "quint/version?full=1").then((d) => { this._up = d || null; }).catch(() => { this._up = { error: true }; }).finally(() => { this._upBusy = false; this._draw(true); });
  }
  _upAct(a) {
    if (this._upBusy) return;
    if (a === "restart" && !confirm("Restart Home Assistant now?")) return;
    this._upBusy = true; this._upMsg = a === "check" ? "Checking GitHub through HACS…" : a === "install" ? "Asking HACS to install…" : "Restarting Home Assistant…"; this._draw(true);
    this._h.callApi("POST", "quint/update", { action: a }).then((d) => { this._up = d || this._up; this._upMsg = ""; if (a === "restart") this._upMsg = "Home Assistant is restarting. This page reloads when it is back."; })
      .catch((e) => { this._upMsg = a === "restart" ? "Home Assistant is restarting. This page reloads when it is back." : "That did not work: " + ((e && e.body && e.body.message) || (e && e.message) || "error"); })
      .finally(() => { this._upBusy = false; this._draw(true); if (a !== "restart") setTimeout(() => this._upLoad(true), 4000); });
  }
  _goRoot() { location.href = "/"; }
  async _signOut() {
    if (!confirm(this._dirty ? "You have unsaved settings. Sign out anyway?" : "Sign out of Home Assistant on this device?")) return;
    const h = this._h;
    try { if (h && h.auth && typeof h.auth.revoke === "function") await h.auth.revoke(); } catch (e) {}
    try { if (h && h.connection && h.connection.close) h.connection.close(); } catch (e) {}
    try { localStorage.removeItem("hassTokens"); sessionStorage.removeItem("quint_rl"); } catch (e) {}
    this._goRoot();
  }
  _locked() {
    const c = this._c, u = this._h && this._h.user; if (!c || !c.lock || !u || u.is_admin) return false;
    const l = c.lockUsers || []; return !l.length || l.includes(u.id);
  }
  _loadUsers(force) {
    if (force) this._ua = null;
    if (this._ua || this._usersBusy || !(this._admin() || this._mgr())) return;
    this._usersBusy = true;
    this._h.callApi("GET", "quint/users").then((l) => { this._ua = (l || []).filter((x) => x.is_active !== false); }).catch(() => { this._ua = []; }).finally(() => { this._usersBusy = false; this._draw(true); });
  }
  _normUsers() { return (this._ua || []).filter((x) => !x.is_admin); }
  _err(e, d) { return (e && e.body && e.body.message) || (e && e.message) || d; }
  _permPush() {
    try { localStorage.setItem(KEY, JSON.stringify(this._c)); } catch (e) {}
    this._h.callApi("POST", "quint/users", { action: "perms", perms: this._c.perms || {} }).catch((e) => this._toast("Could not save the limits: " + this._err(e, "error")));
  }
  _uact(a, v) {
    const c = this._c;
    if (a === "usel") { this._pu = this._pu === v ? "" : v; return this._draw(true); }
    if (a === "usvc" || a === "urm") {
      const i = v.indexOf("|"), uid = v.slice(0, i); if (this._mgr() && uid === this._h.user.id) return;
      const P = (c.perms = c.perms || {}), p = (P[uid] = P[uid] || { svcOff: [], roomOff: [] }), k = a === "usvc" ? "svcOff" : "roomOff", l = new Set(p[k] || []), key = v.slice(i + 1);
      l.has(key) ? l.delete(key) : l.add(key); p[k] = [...l];
      if (!(p.svcOff || []).length && !(p.roomOff || []).length) delete P[uid];
      this._permPush(); return this._draw(true);
    }
    if (a === "ureset") { if (c.perms) delete c.perms[v]; this._permPush(); return this._draw(true); }
    if (a === "mgr") {
      if (!this._admin()) return;
      return this._h.callApi("POST", "quint/users", { action: "manager", user_id: c.manager === v ? "" : v }).then((d) => { if (d && d.manager) c.manager = d.manager; else delete c.manager; try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} this._toast(c.manager ? "Quint admin chosen" : "No Quint admin"); this._draw(true); }).catch((e) => this._toast("Could not change it: " + this._err(e, "error")));
    }
    if (a === "unew") return this._userNew();
    if (a === "udel") return this._userDel(v);
    if (a === "upd") return this._upAct(v);
    if (a === "upflag") {
      const on = (k) => c[k] !== false, ins = v === "install" ? !on("upInstall") : on("upInstall"), rs = v === "restart" ? !on("upRestart") : on("upRestart");
      c.upInstall = ins; c.upRestart = rs; try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} this._draw(true);
      return this._h.callApi("POST", "quint/update", { action: "settings", install: ins, restart: rs }).catch((e) => this._toast("Could not save: " + this._err(e, "error")));
    }
  }
  async _userNew() {
    const q = (k) => { const el = this.shadowRoot.querySelector(`[data-nu="${k}"]`); return el ? el.value : ""; };
    const name = q("name").trim(), un = q("user").trim().toLowerCase(), pw = q("pass");
    if (!name || !/^[a-z0-9._-]{2,}$/.test(un)) return this._toast("Give a name, and a login name with letters or numbers only");
    if (pw.length < 8) return this._toast("The password needs at least 8 characters");
    this._ubusy = true; this._draw(true);
    try {
      const d = await this._h.callApi("POST", "quint/users", { action: "create", name, username: un, password: pw });
      this._pu = d && d.id; this._toast(`${name} was added`);
      ["name", "user", "pass"].forEach((k) => { const el = this.shadowRoot.querySelector(`[data-nu="${k}"]`); if (el) el.value = ""; });
    } catch (e) { this._toast(this._err(e, "Could not add the user")); }
    this._ubusy = false; this._loadUsers(true); this._draw(true);
  }
  async _userDel(uid) {
    const u = (this._ua || []).find((x) => x.id === uid); if (!u || u.is_admin) return;
    if (!confirm(`Remove ${u.name}? Their Home Assistant account is deleted.`)) return;
    try { await this._h.callApi("POST", "quint/users", { action: "delete", user_id: uid }); } catch (e) { return this._toast(this._err(e, "Could not remove the user")); }
    if (this._c.perms) delete this._c.perms[uid];
    if (this._c.manager === uid) delete this._c.manager;
    if (this._c.lockUsers) { this._c.lockUsers = this._c.lockUsers.filter((x) => x !== uid); this._save(); }
    if (this._pu === uid) this._pu = "";
    this._loadUsers(true); this._draw(true);
  }
  _applyFull() {
    const v = localStorage.getItem("quint_full"); if (v === null && !this._locked()) return;
    const full = v === "1" || this._locked();
    this.dispatchEvent(new CustomEvent("hass-dock-sidebar", { bubbles: true, composed: true, detail: { dock: full ? "always_hidden" : "docked" } }));
  }
  _importRooms(redraw = true) {
    const a = this._h.areas || {};
    const old = Object.fromEntries((this._c.rooms || []).map((r) => [r.id, r])), fl = Object.values(this._h.floors || {}).sort((p, q) => (p.level || 0) - (q.level || 0));
    if (fl.length) this._c.floors = fl.map((f) => ({ id: f.floor_id, name: f.name }));
    this._c.rooms = Object.values(a).map((x) => ({ id: x.area_id, name: x.name, ...(old[x.area_id] && old[x.area_id].pic ? { pic: true } : {}), ...(x.floor_id && fl.length ? { floor: x.floor_id } : old[x.area_id] && old[x.area_id].floor ? { floor: old[x.area_id].floor } : {}) }));
    this._save(); if (redraw) this._draw(true);
  }
  _roomOf(id) {
    if (this._c.map[id]) return this._c.map[id];
    const e = this._h.entities && this._h.entities[id];
    if (!e) return "";
    return e.area_id || (this._h.devices && this._h.devices[e.device_id] && this._h.devices[e.device_id].area_id) || "";
  }
  _svcOf(id) {
    const s = this._h.states[id]; if (!s) return;
    const d = id.split(".")[0], dc = s.attributes.device_class;
    if (d === "light") return "lights";
    if (d === "camera") return "cameras";
    if (d === "climate") return "climate";
    if (d === "media_player") return "media";
    if (d === "cover") return !dc || SHADE_DC.includes(dc) ? "shades" : "security";
    if (d === "lock" || d === "alarm_control_panel") return "security";
    if (d === "binary_sensor" && SEC_BS.includes(dc)) return "security";
  }
  _ents(svc, room) {
    if (!this._svOk(svc)) return [];
    return Object.keys(this._h.states).filter((id) => this._svcOf(id) === svc && !this._c.hide.includes(id) && (!room || this._roomOf(id) === room) && this._rmOk(this._roomOf(id)));
  }
  _nm(id) { return this._h.states[id].attributes.friendly_name || id; }
  _svcsAll() {
    const o = this._svcOrder(), keys = Object.keys(SV).filter((x) => (x === "intercom" ? this._icOn() : x === "clock" ? this._clockTile() : x === "camwall" ? this._wallCams().length > 0 : x === "automations" ? this._autoIds().length > 0 : isCs(x) ? this._csHas(x) || (x === "more" && this._admin()) : this._ents(x).length));
    const r = (k) => { const i = o.indexOf(k); return i < 0 ? 1000 + keys.indexOf(k) : i; };
    return keys.filter((k) => this._svOk(k)).sort((p, q) => r(p) - r(q));
  }
  _svcsList() { return this._svcsAll().filter((x) => x !== "clock"); }
  _svcs() { const h = this._c.svcHide || []; return this._svcsAll().filter((x) => x !== "clock" && !h.includes(x)); }
  _svcsHome() { const h = this._c.svcHide || []; return this._svcsAll().filter((x) => !h.includes(x)); }
  _clockTile() { let v = ""; try { v = localStorage.getItem("quint_ct") || ""; } catch (e) {} return v === "1" ? true : v === "0" ? false : !!this._c.clockTile; }
  _clockStyle() { let v = ""; try { v = localStorage.getItem("quint_ck") || ""; } catch (e) {} return v === "analog" || v === "digital" ? v : this._c.cks === "analog" ? "analog" : "digital"; }
  _titles() { const T = this._c.svcTitle || {}; Object.keys(SV).forEach((k) => { SV[k].n = T[k] || (k.startsWith("cs:") ? k.slice(3) : SV_DEF[k]); }); }
  _svcRooms(s) { const h = (this._c.roomHide || {})[s] || []; return this._rooms().filter((r) => !h.includes(r.id)); }
  _rooms() { return this._svOk("rooms") ? this._c.rooms.filter((r) => r.on !== false && this._rmOk(r.id)) : []; }
  _isOn(id) { return !OFF.includes(this._h.states[id].state); }
  _stats(svc) {
    const e = this._ents(svc), st = (i) => this._h.states[i].state;
    if (isCs(svc)) { const all = Object.entries(this._c.custom).filter(([k]) => k !== "home").flatMap(([, v]) => v.filter((x) => this._csKey(x) === svc)); const n = all.filter((x) => x.entity && this._h.states[x.entity] && this._isOn(x.entity)).length; return { big: all.length, lbl: `cards · ${n} on`, on: n > 0 }; }
    if (svc === "lights") { const n = e.filter((i) => st(i) === "on").length; return { big: n, lbl: `of ${e.length} on`, on: n > 0 }; }
    if (svc === "cameras") { const n = e.filter((i) => !["unavailable", "unknown"].includes(st(i))).length; return { big: n, lbl: `of ${e.length} online`, on: n > 0 }; }
    if (svc === "shades") { const o = e.filter((i) => ["open", "opening"].includes(st(i))).length; return { big: `${o} / ${e.length - o}`, lbl: "open / closed", on: o > 0 }; }
    if (svc === "climate") { const n = e.filter((i) => !["off", "unavailable"].includes(st(i))).length; return { big: n, lbl: `of ${e.length} on`, on: n > 0 }; }
    if (svc === "media") { const n = e.filter((i) => ["on", "playing", "paused", "idle"].includes(st(i))).length; return { big: n, lbl: `of ${e.length} on`, on: n > 0 }; }
    const o = e.filter((i) => ["on", "open", "unlocked"].includes(st(i))).length;
    return { big: o ? `${o} open` : "Secure", lbl: o ? "doors & locks" : "all closed & locked", on: o > 0 };
  }
  _roomCount(svc, r) {
    if (isCs(svc)) { const it = this._csItems(r, svc).map((x) => x.it); return { n: it.filter((x) => x.entity && this._h.states[x.entity] && this._isOn(x.entity)).length, t: it.length }; }
    const e = this._ents(svc, r); if (!e.length) return null;
    const n = e.filter((i) => { const s = this._h.states[i].state; return svc === "shades" ? ["open", "opening"].includes(s) : svc === "lights" ? s === "on" : this._isOn(i); }).length;
    return { n, t: e.length };
  }
  _admin() { return !!(this._h && this._h.user && this._h.user.is_admin); }
  _mgr() { const u = this._h && this._h.user; return !!(u && !u.is_admin && this._c && this._c.manager && this._c.manager === u.id); }
  _perm() { const u = this._h && this._h.user; if (!u || u.is_admin || !this._c) return null; return (this._c.perms || {})[u.id] || null; }
  _svOk(s) { const p = this._perm(); return !p || !s || !(p.svcOff || []).includes(s); }
  _rmOk(r) { const p = this._perm(); return !p || !r || !(p.roomOff || []).includes(r); }
  _entOk(id) { return this._svOk(this._svcOf(id)) && this._rmOk(this._roomOf(id)); }
  _sceneOk(x) { return !this._perm() || (this._rmOk(x.room) && (x.items || []).every((i) => this._entOk(i.e))); }
  _nav(p, x = {}) {
    if (this._v.p === "settings" && p !== "settings" && this._dirty) { if (!confirm("Discard unsaved settings changes?")) return; this._revert(); }
    if (p === "settings" && this._v.p !== "settings") { this._snap = JSON.stringify(this._c); this._dirty = false; }
    this._v = { p, ...x }; this._draw(true);
  }
  _tileGo(s) { return s === "cameras" || s === "security" || s === "intercom" || s === "automations" || s === "camwall" ? `data-go='${JSON.stringify({ p: s })}'` : `data-go='${JSON.stringify({ p: "rooms", svc: s })}'`; }

  /* ---------- events ---------- */
  _click(e) {
    if (this._mv && this._mv.carry) return this._carryClick(e);
    if (this._sup && Date.now() < this._sup) return;
    const t = e.composedPath().find((n) => n.dataset && (n.dataset.go || n.dataset.act || n.dataset.tog || n.dataset.cc || n.dataset.tpl || n.dataset.s || n.dataset.cam || n.dataset.sc !== undefined || n.dataset.ic || n.dataset.pers || n.dataset.pb || n.dataset.pick || n.dataset.rimgb || n.dataset.um || n.dataset.out));
    if (!t) return;
    const d = t.dataset;
    if ((d.cc || d.s || (d.tog && !d.tog.startsWith("menu"))) && !this._admin()) return;
    if (d.out) return this._signOut();
    if (d.um) { const i = d.um.indexOf("|"); if (!this._admin() && !this._mgr()) return; return this._uact(d.um.slice(0, i), d.um.slice(i + 1)); }
    if (d.sc !== undefined) { const i = d.sc.indexOf("|"); return this._scAct(d.sc.slice(0, i), d.sc.slice(i + 1)); }
    if (d.ic) return this._icAct(d.ic);
    if (d.rimgb) return this._rimgDel(d.rimgb);
    if (d.pick) { const i = d.pick.indexOf("|"); (this._pick = this._pick || {})[d.pick.slice(0, i)] = d.pick.slice(i + 1); return this._draw(true); }
    if (d.pers) { if (d.pers === "bg" && e.composedPath()[0] !== t) return; this._pers = d.pers === "open"; return this._draw(true); }
    if (d.pb) {
      const i = d.pb.indexOf("|"), a = d.pb.slice(0, i), v = d.pb.slice(i + 1);
      if (a === "preset") this._bgLocal({ preset: v, mode: "preset" });
      else if (a === "shared") { try { localStorage.removeItem("quint_bgu"); } catch (er) {} this._applyBg(); }
      return this._draw(true);
    }
    if (d.cam) {
      const v = d.cam, cams = this._camList();
      if (v === "keep") return;
      if (v === "prev" || v === "next") { const n = cams.length, i = cams.indexOf(this._cam); if (n) this._cam = cams[(i + (v === "next" ? 1 : -1) + n) % n]; }
      else this._cam = v === "close" || v === "bg" ? null : v;
      this._camFb = false; return this._draw(true);
    }
    if (d.tpl) return this._tap(d.tpl);
    if (d.s) { const i = d.s.indexOf("|"); return this._sact(d.s.slice(0, i), d.s.slice(i + 1)); }
    if (d.go) { const { p, ...x } = JSON.parse(d.go); return this._nav(p, x); }
    if (d.cc) {
      const [k, r, i] = d.cc.split(":");
      if (k === "open") { const cv = this._v.svc || ""; this._dlg = { room: r, place: r, mode: "entity", tap: "details", sn: cv.startsWith("cs:") ? cv.slice(3) : cv === "more" ? "More" : "" }; return this._draw(true); }
      if (k === "cancel") { this._dlg = null; return this._draw(true); }
      if (k === "pin") { const it = (this._c.custom[r] || [])[+i]; if (it) { if (it.tile) delete it.tile; else it.tile = true; this._save(this._v.p !== "settings"); this._syncTpl(); } return this._draw(true); }
      if (k === "vis") { const it = (this._c.custom[r] || [])[+i]; if (it) { if (it.off) delete it.off; else it.off = true; this._save(this._v.p !== "settings"); this._syncTpl(); } return this._draw(true); }
      if (k === "del") { this._c.custom[r].splice(+i, 1); this._save(this._v.p !== "settings"); this._syncTpl(); return this._draw(true); }
      if (k === "save") return this._saveCC();
    }
    if (d.act) { const [dom, srv] = d.act.split("."); const data = d.x ? JSON.parse(d.x) : {}; this._h.callService(dom, srv, { entity_id: d.e, ...data }); return; }
    if (d.tog) {
      const [k, v] = d.tog.split(":");
      if (k === "menu") return this.dispatchEvent(new CustomEvent("hass-toggle-menu", { bubbles: true, composed: true }));
      if (k === "full") { localStorage.setItem("quint_full", localStorage.getItem("quint_full") === "1" ? "0" : "1"); this._applyFull(); return this._draw(true); }
      if (k === "room") this._c.rooms[+v].on = this._c.rooms[+v].on === false;
      if (k === "hide") this._c.hide = this._c.hide.includes(v) ? this._c.hide.filter((x) => x !== v) : [...this._c.hide, v];
      if (k === "del") this._c.rooms.splice(+v, 1);
      if (k === "rpic") this._c.rooms[+v].pic = !this._c.rooms[+v].pic;
      if (k === "fadd") { const n = prompt("Floor name"); if (n) (this._c.floors = this._c.floors || []).push({ id: "f" + Date.now(), name: n.slice(0, 24) }); }
      if (k === "fdel") { const f = (this._c.floors || [])[+v]; if (f) { this._c.rooms.forEach((r) => { if (r.floor === f.id) delete r.floor; }); this._c.floors.splice(+v, 1); } }
      if (k === "add") { const n = prompt("Room name"); if (n) this._c.rooms.push({ id: "r" + Date.now(), name: n }); }
      if (k === "import") return this._importRooms();
      this._save(); this._draw(true);
    }
  }
  _change(e) {
    const t = e.target, d = t.dataset, adm = this._admin();
    if (d.rimg !== undefined) { const fl = t.files && t.files[0]; if (fl) this._pickRoomImg(fl, d.rimg); t.value = ""; return; }
    if (d.pbfile !== undefined) { const fl = t.files && t.files[0]; if (fl) this._pickBgLocal(fl); t.value = ""; return; }
    if (d.sdf !== undefined && this._sd) { this._sd[d.sdf] = t.value; this._draw(true); return; }
    if (adm && d.icf) { const ic = this._icCur(), [a, b] = d.icf.split("."); if (!ic) return; if (b) { ic[a] = ic[a] || {}; ic[a][b] = t.value.trim(); } else ic[a] = t.value.trim(); this._save(); this._draw(true); return; }
    if (d.devsel !== undefined) { localStorage.setItem("quint_dev", t.value); this._layout(); this._draw(true); return; }
    if (adm && d.bgfile !== undefined) { const fl = t.files && t.files[0]; if (fl) this._pickBg(fl); t.value = ""; return; }
    if (adm && d.import !== undefined) {
      const fl = t.files && t.files[0];
      if (fl) fl.text().then((tx) => { try { this._importCfg(JSON.parse(tx)); this._toast("Imported — press Save"); } catch (er) { this._toast("Not a valid settings file"); } });
      t.value = ""; return;
    }
    if (adm && d.bg) { this._save(); return; }
    if (adm && d.wn !== undefined) { const w = (this._c.wall = this._c.wall || {}); w.n = Math.max(1, Math.min(32, +t.value || 4)); this._save(); this._draw(true); return; }
    if (adm && d.cred !== undefined) { this._c.credit = t.value.trim().slice(0, 30); this._save(); this._draw(true); return; }
    if (adm && d.ttl !== undefined) { this._c.title = t.value.trim().slice(0, 30); this._save(); this._draw(true); return; }
    if (adm && d.svct) { this._c.svcTitle = this._c.svcTitle || {}; this._c.svcTitle[d.svct] = t.value.trim().replace(/['"<>\\&]/g, "").slice(0, 24); this._save(); this._draw(true); return; }
    if (d.slider) { const [dom, srv, key, div] = d.slider.split("|"); this._h.callService(dom, srv, { entity_id: d.e, [key]: +t.value / +div }); }
    if (adm && d.rname !== undefined) { this._c.rooms[+d.rname].name = t.value; this._save(); }
    if (adm && d.fname !== undefined) { this._c.floors[+d.fname].name = t.value.slice(0, 24); this._save(); }
    if (adm && d.rfl !== undefined) { const r = this._c.rooms[+d.rfl]; if (t.value) r.floor = t.value; else delete r.floor; this._save(); this._draw(true); return; }
    if (adm && d.map) { this._c.map[d.map] = t.value; this._save(); }
    if (d.sel) { const [dom, srv, key] = d.sel.split("|"); this._h.callService(dom, srv, { entity_id: d.e, [key]: t.value }); }
    if (adm && d.dd && this._dlg) { this._dlg[d.dd] = t.value; if (d.dd === "dom") this.shadowRoot.getElementById("cc-list").innerHTML = this._opts(t.value); if (d.dd === "mode" || d.dd === "tap" || d.dd === "place") this._draw(true); }
    if (adm && d.uname !== undefined) { this._c.name = t.value; this._save(); this._draw(true); }
  }

  /* ---------- cards ---------- */
  _card(id) {
    const s = this._h.states[id], d = id.split(".")[0], a = s.attributes, n = this._nm(id), on = this._isOn(id);
    const sv = SV[this._svcOf(id)];
    const hd = (st) => `<div class="row"><div class="bdg" style="--c:${sv.c}">${sv.i}</div><div class="grow"><div class="nm">${n}</div><div class="st">${st}</div></div>`;
    const tg = (o) => `<button class="sw ${o ? "on" : ""}" data-act="${d === "media_player" ? "media_player.toggle" : d + ".toggle"}" data-e="${id}"></button>`;
    const bt = (act, label, x) => `<button data-act="${act}" data-e="${id}" ${x ? `data-x='${x}'` : ""}>${label}</button>`;
    if (d === "light") {
      const b = a.brightness || 0, dim = !(a.supported_color_modes || []).every((m) => m === "onoff");
      return `<div class="card ${s.state === "on" ? "on" : ""}">${hd(s.state === "on" ? Math.round(b / 2.55) + "%" : "Off")}${tg(s.state === "on")}</div>${dim && s.state !== "unavailable" ? `<input type=range min=1 max=255 value=${b} data-slider="light|turn_on|brightness_pct|2.55" data-e="${id}">` : ""}</div>`.replace("brightness_pct|2.55", "brightness|1");
    }
    if (d === "cover" && this._svcOf(id) === "shades") return this._shadeCard(id);
    if (d === "cover") return `<div class="card ${on && s.state !== "closed" ? "on" : ""}">${hd(s.state + (a.current_position != null ? " · " + a.current_position + "%" : ""))}</div><div class="btns">${bt("cover.open_cover", "▲ Open")}${bt("cover.stop_cover", "■")}${bt("cover.close_cover", "▼ Close")}</div></div>`;
    if (d === "climate") {
      const t = a.temperature || 22;
      return `<div class="card ${on ? "on" : ""}">${hd(`${s.state} · now ${a.current_temperature ?? "–"}°`)}<div class="big">${t}°</div></div><div class="btns">${bt("climate.set_temperature", "−", `{"temperature":${t - 0.5}}`)}${bt("climate.set_temperature", "+", `{"temperature":${t + 0.5}}`)}${bt(on ? "climate.turn_off" : "climate.turn_on", on ? "Off" : "On")}</div></div>`;
    }
    if (d === "media_player") {
      const v = Math.round((a.volume_level || 0) * 100);
      return `<div class="card ${on ? "on" : ""}">${hd(s.state + (a.media_title ? " · " + a.media_title : ""))}${tg(on)}</div><div class="btns">${bt("media_player.media_previous_track", "⏮")}${bt("media_player.media_play_pause", "⏯")}${bt("media_player.media_next_track", "⏭")}</div><input type=range min=0 max=100 value=${v} data-slider="media_player|volume_set|volume_level|100" data-e="${id}"></div>`;
    }
    if (d === "camera") {
      const off = ["unavailable", "unknown"].includes(s.state);
      const src = a.entity_picture ? this._h.hassUrl(a.entity_picture) : "";
      return `<div class="card" ${off || !src ? "" : `data-cam="${id}"`}>${hd(`<span class="dot ${off ? "" : "ok"}"></span>${off ? "Offline" : "Online"}`)}</div>${off || !src ? "" : `<img class="cam" data-src="${src}" src="${src}">`}</div>`;
    }
    if (d === "lock") { const l = s.state === "locked"; return `<div class="card ${l ? "" : "on"}">${hd(l ? "🔒 Locked" : "🔓 " + s.state)}</div><div class="btns">${bt("lock.lock", "Lock")}${bt("lock.unlock", "Unlock")}</div></div>`; }
    if (d === "binary_sensor") { const o = s.state === "on"; return `<div class="card ${o ? "on" : ""}">${hd(o ? "Open / Active" : "Closed / Clear")}</div></div>`; }
    if (d === "alarm_control_panel") return this._gen({ entity: id, style: "x" });
    return `<div class="card">${hd(s.state)}</div></div>`;
  }

  /* ---------- custom cards ---------- */
  _uid() { return Math.random().toString(36).slice(2, 9); }
  _lo() { try { return JSON.parse(localStorage.getItem("quint_ord") || "{}") || {}; } catch (e) { return {}; } }
  _ordOf(ctx) { return (!this._admin() && this._lo()[ctx]) || (this._c.order && this._c.order[ctx]); }
  _ordSet(ctx, list) {
    if (this._admin()) { this._c.order[ctx] = list; this._save(); return; }
    try { const o = this._lo(); o[ctx] = list; localStorage.setItem("quint_ord", JSON.stringify(o)); } catch (e) { this._toast("Not enough space to save the arrangement"); }
  }
  _svcMove(from, to) {
    const l = this._svcsAll(), i = l.indexOf(from), j = l.indexOf(to); if (i < 0 || j < 0) return;
    l.splice(i, 1); l.splice(j, 0, from);
    if (this._admin()) { this._c.svcOrder = l; this._save(); return; }
    try { localStorage.setItem("quint_svo", JSON.stringify(l)); } catch (e) {}
  }
  _svcOrder() { if (!this._admin()) { try { const l = JSON.parse(localStorage.getItem("quint_svo") || "null"); if (Array.isArray(l)) return l; } catch (e) {} } return this._c.svcOrder || []; }
  _sort(ctx, arr, key) {
    const o = this._ordOf(ctx); if (!o) return arr;
    const r = (x) => { const i = o.indexOf(key(x)); return i < 0 ? 1e6 : i; };
    return arr.map((x, i) => [x, i]).sort((p, q) => r(p[0]) - r(q[0]) || p[1] - q[1]).map((x) => x[0]);
  }
  _kw(k, html) { return `<div class="kw" data-k="${k}">${html}</div>`; }
  /* ---------- window / shutter / curtain visuals ---------- */
  _cvKind(id) {
    const a = this._h.states[id].attributes, dc = a.device_class, n = (this._nm(id) + " " + id).toLowerCase();
    if (dc === "curtain" || /curtain|drape|ستار/.test(n)) return "curtain";
    if (dc === "awning" || /awning|pergola|canopy/.test(n)) return "awning";
    return "slats";
  }
  _cvCan(id) { const a = this._h.states[id].attributes; return a.current_position != null || ((a.supported_features || 0) & 4) > 0; }
  _cvPos(id) {
    const o = this._wopt && this._wopt[id]; if (o && Date.now() - o.t < 4500) return o.p;
    const s = this._h.states[id], a = s.attributes;
    if (a.current_position != null) return Math.round(a.current_position);
    return s.state === "closed" || s.state === "unavailable" ? 0 : 100;
  }
  _cvSt(id) {
    const s = this._h.states[id], p = this._cvPos(id);
    if (s.state === "opening") return "Opening…"; if (s.state === "closing") return "Closing…"; if (s.state === "unavailable") return "Unavailable";
    return p >= 99 ? "Fully open" : p <= 1 ? "Closed" : p >= 45 && p <= 55 ? "Half open" : "Partly open";
  }
  _win(id, cls) {
    const s = this._h.states[id], k = this._cvKind(id), sun = this._h.states["sun.sun"], night = sun && sun.state === "below_horizon", mv = ["opening", "closing"].includes(s.state);
    return `<div class="win k-${k} ${night ? "night" : ""} ${mv ? "mvg" : ""} ${this._cvCan(id) ? "cd" : ""} ${cls || ""}" data-win="${id}" data-kind="${k}" style="--p:${this._cvPos(id)}"><i class="wg"></i><i class="wc"></i><i class="wl"></i><i class="wr"></i><i class="wf"></i></div>`;
  }
  _winMini(id) {
    const E = (t) => this._esc(t);
    return `<div class="wm" data-id="wm:${E(id)}">${this._win(id, "mini")}<div class="wn">${E(this._nm(id))}</div><div class="wp"><span data-wv>${this._cvPos(id)}%</span></div></div>`;
  }
  _shadeCard(id) {
    const s = this._h.states[id], a = s.attributes, E = (t) => this._esc(t), p = this._cvPos(id), can = this._cvCan(id), tilt = ((a.supported_features || 0) & 128) > 0 || a.current_tilt_position != null;
    const act = (svc, x) => `data-act="cover.${svc}" data-e="${E(id)}" ${x ? `data-x='${x}'` : ""}`;
    const pre = can ? [[100, "Open"], [75, "75"], [50, "50"], [25, "25"], [0, "Closed"]].map(([v, t]) => `<button class="${Math.abs(p - v) <= 2 ? "on" : ""}" ${act("set_cover_position", `{"position":${v}}`)}>${t}</button>`).join("") : "";
    const closed = s.state === "closed" || p <= 1;
    return `<div class="card shc ${closed ? "" : "on"}">${this._win(id)}<div class="shr"><div class="nm">${E(this._nm(id))}</div><div class="st">${E(this._cvSt(id))}</div>${can ? `<div class="bigs"><span data-wv>${p}%</span><small>open</small></div>` : ""}${pre ? `<div class="pre">${pre}</div>` : ""}<div class="shb"><button ${act("open_cover")} title="Open">▲</button><button ${act("stop_cover")} title="Stop">■</button><button ${act("close_cover")} title="Close">▼</button></div>${tilt ? `<div class="tlt"><div class="lbl">Tilt</div><input type=range min=0 max=100 value=${a.current_tilt_position ?? 50} data-slider="cover|set_cover_tilt_position|tilt_position|1" data-e="${E(id)}"></div>` : ""}</div></div>`;
  }
  _wdown(e) {
    if (e.button > 0) return false;
    const w = e.composedPath().find((n) => n.dataset && n.dataset.win !== undefined && n.classList.contains("cd")); if (!w) return false;
    try { w.setPointerCapture(e.pointerId); } catch (er) {}
    this._wd = { w, id: w.dataset.win, kind: w.dataset.kind, x: e.clientX, y: e.clientY, moved: false, p: null };
    this._drag = true; return true;
  }
  _wmove(e) {
    const D = this._wd; if (!D) return false;
    if (!D.moved && Math.hypot(e.clientX - D.x, e.clientY - D.y) < 5) return true;
    D.moved = true; const r = D.w.getBoundingClientRect(), cl = (v) => Math.max(0, Math.min(1, v));
    const c = D.kind === "curtain" ? cl(Math.min(e.clientX - r.left, r.right - e.clientX) / (r.width / 2)) : cl((e.clientY - r.top) / r.height);
    const open = Math.round((1 - c) * 100); D.p = open;
    D.w.classList.remove("mvg"); D.w.style.setProperty("--p", open);
    const box = D.w.closest(".shc,.wm"); if (box) box.querySelectorAll("[data-wv]").forEach((x) => (x.textContent = open + "%"));
    return true;
  }
  _wup() {
    const D = this._wd; if (!D) return false;
    this._wd = null; this._drag = false;
    if (D.moved && D.p != null) {
      (this._wopt = this._wopt || {})[D.id] = { p: D.p, t: Date.now() };
      this._h.callService("cover", "set_cover_position", { entity_id: D.id, position: D.p });
    }
    return true;
  }
  _cardsOf(ids, ctx) { return this._sort(ctx, ids, (i) => "e:" + i).map((i) => this._kw("e:" + i, this._card(i))).join(""); }
  _csKey(it) { const n = (it.svc || "").trim(); return !n || n.toLowerCase() === "more" ? "more" : "cs:" + n; }
  _csItems(rid, key) { return (this._c.custom[rid] || []).map((it, i) => ({ it, i })).filter((x) => this._csKey(x.it) === key && !x.it.off); }
  _csHas(key) { return Object.entries(this._c.custom).some(([r, a]) => r !== "home" && a.some((x) => this._csKey(x) === key && (!x.off || this._admin()))); }
  _syncSv() {
    const PAL = ["#4aa3ff", "#2dd4bf", "#f5a623", "#b388ff", "#34c98b", "#ff7a59", "#7dd3fc", "#f472b6"], found = {};
    Object.entries(this._c.custom).forEach(([r, a]) => { if (r === "home") return; a.forEach((x) => { const k = this._csKey(x); if (k === "more") return; const f = (found[k] = found[k] || { ic: "" }); if (!f.ic && x.svcIcon) f.ic = x.svcIcon; }); });
    Object.keys(SV).forEach((k) => { if (k.startsWith("cs:") && !found[k]) delete SV[k]; });
    Object.entries(found).forEach(([k, f]) => {
      let h = 0; for (const ch of k) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
      SV[k] = { n: k.slice(3), c: PAL[h % PAL.length], i: f.ic ? `<ha-icon icon="${this._esc(f.ic)}"></ha-icon>` : SV.more.i };
    });
  }
  _sched() { if (this._pending) return; this._pending = setTimeout(() => { this._pending = null; this._draw(); }, 150); }
  _csPage(s) {
    const adm = this._admin();
    const parts = this._svcRooms(s).map((r) => [r, this._csItems(r.id, s)]).filter(([, e]) => adm || e.length).map(([r, e]) => {
      const n = e.filter((x) => x.it.entity && this._h.states[x.it.entity] && this._isOn(x.it.entity)).length;
      const add = adm ? `<div class="tile add" data-cc="open:${r.id}"><div class="bdg" style="--c:#8d9ab8">＋</div><div class="nm">Add card</div></div>` : "";
      return `<section><div class="rh"><div class="grow" data-go='${JSON.stringify({ p: "room", room: r.id, svc: s })}'><div class="rn">${r.name}</div><div class="lbl">${n} active of ${e.length}</div></div></div><div class="grid" data-grid="room:${r.id}:${s}">${this._customCards(r.id, "room:" + r.id + ":" + s, s, true)}${add}</div></section>`;
    });
    return `${this._top()}<h1>${SV[s].i} ${SV[s].n}</h1><div class="sub">${adm ? "Admin · add cards to any room with ＋" : "Grouped by room"}</div>${parts.join("") || '<div class="card">No cards yet.</div>'}`;
  }
  _homeCards() {
    const adm = this._admin(), n = (this._c.custom.home || []).filter((x) => adm || !x.off).length;
    if (!n && !adm) return "";
    return `${n ? "<h2>My cards</h2>" : ""}<div class="grid" data-grid="home:cards" style="margin-top:${n ? 0 : 16}px">${this._customCards("home", "home:cards", "", true)}${adm ? `<div class="tile add" data-cc="open:home"><div class="bdg" style="--c:#8d9ab8">＋</div><div class="nm">Add card</div></div>` : ""}</div>`;
  }
  _esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  _findTpl(uid) { return Object.values(this._c.custom).flat().find((x) => x.uid === uid); }
  _syncTpl() {
    if (!this._h || !this._h.connection) return;
    const want = new Set();
    Object.values(this._c.custom).flat().forEach((x) => { if (x.type === "template") [x.text, x.label].forEach((t) => t && want.add(t)); });
    Object.keys(this._tsub).forEach((t) => { if (!want.has(t)) { this._tsub[t].then((u) => u()).catch(() => {}); delete this._tsub[t]; } });
    want.forEach((t) => {
      if (this._tsub[t]) return;
      this._tsub[t] = this._h.connection.subscribeMessage((m) => {
        this._tres[t] = m.result !== undefined ? m.result : m.error ? "⚠ " + m.error : "";
        this._sched();
      }, { type: "render_template", template: t, strict: false, report_errors: true }).catch(() => () => {});
    });
  }
  _tplCard(it) {
    const s = it.entity && this._h.states[it.entity], on = s && !OFF.includes(s.state);
    const r = (t) => (t ? (this._tres[t] !== undefined ? this._esc(this._tres[t]) : "…") : "");
    const label = it.label ? r(it.label) : "";
    return `<div class="card tpl ${on ? "on" : ""}" data-tpl="${it.uid}"><div class="row"><div class="bdg" style="--c:${SV.more.c}"><ha-icon icon="${this._esc(it.icon || "mdi:code-braces")}"></ha-icon></div><div class="grow"><div class="st" style="margin:0">${this._esc(it.name || "")}</div><div class="tv">${r(it.text)}</div>${label ? `<div class="lbl">${label}</div>` : ""}</div></div></div>`;
  }
  _details(it) { if (it && it.entity) this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId: it.entity } })); }
  _tap(uid) {
    const it = this._findTpl(uid); if (!it) return;
    const t = it.tap || "details";
    if (t === "details") return this._details(it);
    if (t === "toggle") { if (it.entity) this._h.callService("homeassistant", "toggle", { entity_id: it.entity }); return; }
    if (t === "action") { const [d, sv] = (it.service || "").split("."); if (d && sv) this._h.callService(d, sv, { ...(it.entity ? { entity_id: it.entity } : {}), ...(it.data || {}) }); return; }
    if (t === "path" && it.path) {
      if (/^https?:/.test(it.path)) window.open(it.path, "_blank");
      else if (it.path.startsWith("/")) { history.pushState(null, "", it.path); window.dispatchEvent(new CustomEvent("location-changed")); }
    }
  }
  _customCards(rid, ctx, key, showOff, noTile) {
    const items = (this._c.custom[rid] || []).map((it, i) => ({ it, i })).filter((x) => (!key || this._csKey(x.it) === key) && (!x.it.off || (showOff && this._admin())) && !(noTile && x.it.tile));
    return this._sort(ctx, items, (x) => "c:" + x.it.uid).map(({ it, i }) => {
      const rm = this._admin() ? `${rid === "home" ? "" : `<button class="rm pin ${it.tile ? "on" : ""}" data-cc="pin:${rid}:${i}" title="${it.tile ? "Shown in the room as a tile: tap to stop" : "Show in the room as a tile"}">⌂</button>`}<button class="rm eye" data-cc="vis:${rid}:${i}" title="${it.off ? "Hidden: tap to show" : "Shown: tap to hide"}">${it.off ? "⊘" : "◉"}</button><button class="rm" data-cc="del:${rid}:${i}">✕</button>` : "", k = "c:" + it.uid;
      if (it.off) return `<div class="cw cwoff" data-k="${k}">${it.type === "template" ? this._tplCard(it) : it.type === "lovelace" ? `<div class="card"><div class="nm">${this._esc(it.name || "Lovelace card")}</div></div>` : this._gen(it)}${rm}<span class="hdn">Hidden</span></div>`;
      return it.type === "template" ? `<div class="cw" data-k="${k}">${this._tplCard(it)}${rm}</div>` : it.type === "lovelace" ? `<div class="cw lvw" data-k="${k}"><div data-lv="${rid}:${i}"></div>${rm}</div>` : `<div class="cw" data-k="${k}">${this._gen(it)}${rm}</div>`;
    }).join("");
  }
  _roomTiles(rid) {
    return (this._c.custom[rid] || []).map((it, i) => ({ it, i })).filter((x) => x.it.tile && !x.it.off && this._svOk(this._csKey(x.it))).map(({ it, i }) => {
      const body = it.type === "template" ? this._tplCard(it) : it.type === "lovelace" ? `<div data-lv="${rid}:${i}"></div>` : this._gen(it);
      return `<div class="bc ctile" data-id="a:t:${this._esc(it.uid || i)}">${body}</div>`;
    });
  }
  _gen(it) {
    const id = it.entity, s = this._h.states[id], st = it.style || "auto";
    if (!s) return `<div class="card"><div class="nm">${it.name || id}</div><div class="st">Entity not found</div></div>`;
    if (st === "auto" && this._svcOf(id)) return this._card(id);
    const d = id.split(".")[0], a = s.attributes, n = it.name || a.friendly_name || id, on = !OFF.includes(s.state);
    const hd = (t) => `<div class="row"><div class="bdg" style="--c:${SV.more.c}">${ICONS[it.icon] || SV.more.i}</div><div class="grow"><div class="nm">${n}</div><div class="st">${t}</div></div>`;
    const b = (act, l) => `<button data-act="${act}" data-e="${id}">${l}</button>`;
    const tog = `<button class="sw ${on ? "on" : ""}" data-act="homeassistant.toggle" data-e="${id}"></button>`;
    const val = `${s.state} ${a.unit_of_measurement || ""}`;
    const sl = (dom, srv, key, min, max, step, v) => `<input type=range min=${min} max=${max} step=${step} value=${v} data-slider="${dom}|${srv}|${key}|1" data-e="${id}">`;
    const C = (o) => `<div class="card ${o ? "on" : ""}">`;
    if (st === "value") return `${C(on)}${hd(d.replace("_", " "))}<div class="nm">${val}</div></div></div>`;
    if (st === "toggle") return `${C(on)}${hd(s.state)}${tog}</div></div>`;
    if (st === "button") return `${C(0)}${hd("Tap to run")}</div><div class="btns">${b("homeassistant.turn_on", "▶ Run")}</div></div>`;
    if (["scene", "script", "button", "input_button"].includes(d)) return `${C(0)}${hd("Tap to run")}</div><div class="btns">${b(d === "button" || d === "input_button" ? d + ".press" : d + ".turn_on", "▶ Run")}</div></div>`;
    if (d === "vacuum") return `${C(on)}${hd(s.state + (a.battery_level != null ? " · " + a.battery_level + "%" : ""))}</div><div class="btns">${b("vacuum.start", "▶")}${b("vacuum.pause", "❚❚")}${b("vacuum.return_to_base", "⌂")}</div></div>`;
    if (d === "lawn_mower") return `${C(on)}${hd(s.state)}</div><div class="btns">${b("lawn_mower.start_mowing", "▶")}${b("lawn_mower.pause", "❚❚")}${b("lawn_mower.dock", "⌂")}</div></div>`;
    if (d === "fan") { const p = a.percentage; return `${C(on)}${hd(on ? (p != null ? p + "%" : "On") : "Off")}${tog}</div>${p != null ? sl("fan", "set_percentage", "percentage", 0, 100, a.percentage_step || 1, p) : ""}</div>`; }
    if (d === "humidifier") return `${C(on)}${hd((on ? "On" : "Off") + " · now " + (a.current_humidity ?? "–") + "%")}${tog}</div>${sl("humidifier", "set_humidity", "humidity", a.min_humidity || 0, a.max_humidity || 100, 1, a.humidity || 0)}</div>`;
    if (d === "number" || d === "input_number") return `${C(0)}${hd(val)}</div>${sl(d, "set_value", "value", a.min ?? 0, a.max ?? 100, a.step ?? 1, +s.state || 0)}</div>`;
    if (d === "select" || d === "input_select") return `${C(0)}${hd(d.replace("_", " "))}</div><select data-sel="${d}|select_option|option" data-e="${id}" style="margin-top:12px">${(a.options || []).map((o) => `<option ${o === s.state ? "selected" : ""}>${o}</option>`).join("")}</select></div>`;
    if (d === "water_heater") { const t = a.temperature || 50; return `${C(on)}${hd(s.state + " · now " + (a.current_temperature ?? "–") + "°")}<div class="nm">${t}°</div></div><div class="btns">${b2("water_heater.set_temperature", "−", t - 1)}${b2("water_heater.set_temperature", "+", t + 1)}</div></div>`; }
    if (d === "alarm_control_panel") return `${C(s.state !== "disarmed")}${hd(s.state.replace(/_/g, " "))}</div><div class="btns">${b("alarm_control_panel.alarm_disarm", "Disarm")}${b("alarm_control_panel.alarm_arm_home", "Home")}${b("alarm_control_panel.alarm_arm_away", "Away")}</div></div>`;
    if (d === "weather") return `${C(1)}${hd(s.state)}<div class="nm">${a.temperature ?? "–"}${a.temperature_unit || "°"}</div></div></div>`;
    if (["switch", "input_boolean", "automation", "valve", "siren", "remote", "group"].includes(d)) return `${C(on)}${hd(s.state)}${tog}</div></div>`;
    return `${C(s.state === "on")}${hd(d.replace(/_/g, " "))}<div class="nm">${val}</div></div></div>`;
    function b2(act, l, v) { return `<button data-act="${act}" data-e="${id}" data-x='{"temperature":${v}}'>${l}</button>`; }
  }
  _opts(dom) {
    return Object.keys(this._h.states).filter((i) => !dom || i.startsWith(dom + ".")).sort().map((i) => `<option value="${i}">${this._h.states[i].attributes.friendly_name || ""}</option>`).join("");
  }
  _dialog() {
    if (!this._dlg || !this._admin()) return "";
    const D = this._dlg, mode = D.mode || "entity", doms = {};
    Object.keys(this._h.states).forEach((i) => { const k = i.split(".")[0]; doms[k] = (doms[k] || 0) + 1; });
    const sel = (key, list) => `<select data-dd="${key}">${list.map(([v, l]) => `<option value="${v}" ${(D[key] || "") === v ? "selected" : ""}>${l}</option>`).join("")}</select>`;
    const L = (t, sub) => `<div class="lbl" style="margin:12px 0 4px">${t}${sub ? ` · ${sub}` : ""}</div>`;
    const inp = (id, ph, val) => `<input type="text" id="${id}" placeholder="${this._esc(ph)}" ${val ? `value="${val}"` : ""}>`;
    let body = "";
    if (mode === "template") {
      const tap = D.tap || "details";
      body = `${L("Name")}${inp("cc-name", "e.g. Outside")}
      ${L("Icon", "mdi name")}${inp("cc-icon", "mdi:code-braces", "mdi:code-braces")}
      ${L("Text", "Jinja template for the state")}${inp("cc-tt", "{{ states('sensor.outside_temperature') }} °C")}
      ${L("Label", "optional, small line below")}${inp("cc-tl", "{{ relative_time(states.sensor.x.last_changed) }} ago")}
      ${L("Entity", "for details (hold) and toggling")}<input type="text" id="cc-ent" list="cc-list" placeholder="sensor.x"><datalist id="cc-list">${this._opts("")}</datalist>
      ${L("Tap")}${sel("tap", [["details", "entity details"], ["toggle", "toggle entity"], ["action", "run action"], ["path", "go to path"]])}
      ${tap === "action" ? `${L("Action", "domain.service")}${inp("cc-svc", "light.turn_on")}${L("Action data", "optional JSON")}${inp("cc-data", '{"brightness": 200}')}` : ""}
      ${tap === "path" ? `${L("Path", "e.g. /lovelace/0 or https://…")}${inp("cc-path", "/lovelace/0")}` : ""}
      <div class="lbl" style="margin-top:10px">Hold a card for about 1 second to open entity details. Hold 2 seconds, then drag, to move it.</div>`;
    } else if (mode === "lovelace") {
      body = `${L("Lovelace card as JSON", "custom cards supported")}<textarea id="cc-json" placeholder='{"type":"custom:mushroom-light-card","entity":"light.x"}'></textarea>`;
    } else {
      body = `${L("Device type")}${sel("dom", [["", "All device types (" + Object.keys(this._h.states).length + ")"], ...Object.keys(doms).sort().map((k) => [k, k.replace(/_/g, " ") + " (" + doms[k] + ")"])])}
      ${L("Entity")}<input type="text" id="cc-ent" list="cc-list" placeholder="Start typing a name or entity id"><datalist id="cc-list">${this._opts(D.dom || "")}</datalist>
      ${L("Display name (optional)")}<input type="text" id="cc-name">
      ${L("Card style")}${sel("style", [["auto", "Auto – best control for this device"], ["toggle", "On / Off switch"], ["button", "Run button"], ["value", "Value / status only"]])}
      ${L("Icon")}${sel("icon", [["", "Default"], ...Object.keys(ICONS).map((k) => [k, k])])}`;
    }
    const names = [...new Set(Object.entries(this._c.custom).filter(([k]) => k !== "home").flatMap(([, a]) => a.map((x) => { const k = this._csKey(x); return k === "more" ? "More" : k.slice(3); })))];
    const svcFields = (D.place || D.room) === "home" ? "" : `${L("Service", "tile name on the home screen")}<input type="text" id="cc-sn" list="cc-sl" placeholder="More" value="${this._esc(D.sn || "")}"><datalist id="cc-sl">${names.map((n) => `<option value="${this._esc(n)}">`).join("")}</datalist>${L("Service icon", "optional, mdi name")}${inp("cc-sico", "mdi:gate")}`;
    return `<div class="ov"><div class="dlg"><h1 style="font-size:26px">New card</h1>
      ${L("Card type")}${sel("mode", [["entity", "Device card (any entity)"], ["template", "Template card (Jinja)"], ["lovelace", "Lovelace card (JSON)"]])}
      ${L("Place", "home page or a room")}${sel("place", [["home", "Home"], ...this._c.rooms.map((r) => [r.id, r.name])])}
      ${svcFields}
      ${(D.place || D.room) === "home" ? "" : `${L("Show in the room", "as part of the service page, or as its own tile")}${sel("tile", [["", "Grouped under its service (e.g. More)"], ["1", "Its own tile in the room page"]])}`}
      ${body}
      <div class="err" id="cc-err"></div><div class="btns"><button data-cc="cancel">Cancel</button><button class="pri" data-cc="save">Add card</button></div></div></div>`;
  }
  _saveCC() {
    const q = (i) => this.shadowRoot.getElementById(i), err = (t) => { q("cc-err").textContent = t; };
    const v = (i) => (q(i) ? q(i).value.trim() : ""), D = this._dlg, mode = D.mode || "entity", place = D.place || D.room;
    let item;
    if (mode === "lovelace") {
      try { const c = JSON.parse(v("cc-json")); if (!c.type) throw new Error('"type" is missing'); item = { type: "lovelace", config: c }; } catch (e) { return err("Invalid JSON: " + e.message); }
    } else if (mode === "template") {
      const tap = D.tap || "details", ent = v("cc-ent");
      if (!v("cc-tt") && !v("cc-tl")) return err("Enter a text template");
      if (ent && !this._h.states[ent]) return err("Entity not found: " + ent);
      let data = {};
      if (tap === "action") {
        if (!/^[a-z_]+\.[a-z0-9_]+$/i.test(v("cc-svc"))) return err("Action must look like light.turn_on");
        if (v("cc-data")) { try { data = JSON.parse(v("cc-data")); } catch (e) { return err("Action data is not valid JSON"); } }
      }
      if (tap === "path" && !/^(\/|https?:)/.test(v("cc-path"))) return err("Path must start with / or http");
      item = { type: "template", name: v("cc-name"), icon: v("cc-icon") || "mdi:code-braces", text: v("cc-tt"), label: v("cc-tl"), entity: ent, tap, service: v("cc-svc"), data, path: v("cc-path") };
    } else {
      const ent = v("cc-ent");
      if (!ent || !this._h.states[ent]) return err("Pick a valid entity");
      item = { type: "entity", entity: ent, name: v("cc-name"), style: D.style || "auto", icon: D.icon || "" };
    }
    if (place !== "home") { item.svc = v("cc-sn").replace(/['"<>\\&]/g, "").slice(0, 24); const ic = v("cc-sico"); if (/^mdi:[a-z0-9-]+$/i.test(ic)) item.svcIcon = ic; }
    item.uid = this._uid();
    if (place !== "home" && D.tile === "1") item.tile = true;
    (this._c.custom[place] = this._c.custom[place] || []).push(item);
    this._save(true); this._dlg = null; this._syncTpl();
    this._v = place === "home" ? { p: "home" } : item.tile ? { p: "room", room: place } : { p: "rooms", svc: this._csKey(item) };
    this._last = null; this._draw(true);
  }
  async _mountLv() {
    const ph = this.shadowRoot.querySelectorAll("[data-lv]"); if (!ph.length) return;
    this._lvc = this._lvc || {};
    for (const p of ph) {
      const [r, i] = p.dataset.lv.split(":"), it = (this._c.custom[r] || [])[+i]; if (!it) continue;
      const k = JSON.stringify(it.config); let el = this._lvc[k];
      if (!el) { try { const hp = await window.loadCardHelpers(); el = await hp.createCardElement(it.config); } catch (e) { el = document.createElement("div"); el.textContent = "Card error: " + e.message; } this._lvc[k] = el; }
      el.hass = this._h; if (el.parentNode !== p) p.appendChild(el);
    }
  }

  /* ---------- pages ---------- */
  _brand() {
    const menu = !this._locked() && (this._narrow || localStorage.getItem("quint_full") === "1") ? `<button class="ib" data-tog="menu:0">☰</button>` : "";
    return `<div class="brand">${menu}<span>${this._esc(this._c.title || this._title || "Quint")}</span></div>`;
  }
  _top(back = true) { return `<div class="top">${this._brand()}${back ? `<button class="back" data-go='{"p":"home"}'>‹ Home</button>` : ""}</div>`; }
  _credit() { const t = this._c.credit; return this._esc(t === undefined ? "By Quinteca" : t); }
  _clock(d) {
    const L = this._h && this._h.locale, f = L && L.time_format, o = { hour: "2-digit", minute: "2-digit" }, dt = d || new Date();
    if (f === "24") o.hourCycle = "h23"; else if (f === "12") o.hour12 = true;
    try { return dt.toLocaleTimeString((L && L.language) || [], o); } catch (e) { return dt.toLocaleTimeString([], o); }
  }
  _clockBlock(where) {
    if (this._clockStyle() === "analog") {
      let t = "";
      for (let i = 0; i < 60; i++) { const a = (i * 6 * Math.PI) / 180, mj = i % 5 === 0, r1 = mj ? 82 : 88, r2 = 94; t += `<line x1="${(100 + r1 * Math.sin(a)).toFixed(1)}" y1="${(100 - r1 * Math.cos(a)).toFixed(1)}" x2="${(100 + r2 * Math.sin(a)).toFixed(1)}" y2="${(100 - r2 * Math.cos(a)).toFixed(1)}" class="${mj ? "tm5" : "tm1"}"/>`; }
      let n = ""; for (let i = 1; i <= 12; i++) { const a = (i * 30 * Math.PI) / 180; n += `<text x="${(100 + 68 * Math.sin(a)).toFixed(1)}" y="${(100 - 68 * Math.cos(a) + 6).toFixed(1)}" text-anchor="middle">${i}</text>`; }
      const hand = (c, y1, y2) => `<g class="${c}" data-ks="1" style="transform:rotate(0deg)"><line x1="100" y1="${y1}" x2="100" y2="${y2}"/></g>`;
      return `<div class="aclk ${where}" data-clk="a"><svg viewBox="0 0 200 200" role="img" aria-label="Clock"><circle cx="100" cy="100" r="97" class="fc"/>${t}${n}${hand("ahh", 112, 54)}${hand("amh", 116, 30)}${hand("ash", 122, 20)}<circle cx="100" cy="100" r="5" class="cd"/></svg></div>`;
    }
    return `<div class="${where === "left" ? "clk" : "clk2"}" data-clk="d">@@C@@</div>`;
  }
  _tickClock() {
    const R = this.shadowRoot; if (!R) return;
    const d = new Date(), sec = d.getSeconds(), mi = d.getMinutes() + sec / 60, hr = (d.getHours() % 12) + mi / 60;
    R.querySelectorAll('[data-clk="a"]').forEach((el) => {
      const set = (c, deg) => { const g = el.querySelector("." + c); if (g) { const v = `rotate(${deg.toFixed(2)}deg)`; if (g.style.transform !== v) g.style.transform = v; } };
      set("ahh", hr * 30); set("amh", mi * 6); set("ash", sec * 6);
    });
    const h = this._clockHtml(); R.querySelectorAll('[data-clk="d"]').forEach((el) => { if (el.innerHTML !== h) el.innerHTML = h; });
  }
  _clockHtml() {
    const L = this._h && this._h.locale, f = L && L.time_format, o = { hour: "2-digit", minute: "2-digit" };
    if (f === "24") o.hourCycle = "h23"; else if (f === "12") o.hour12 = true;
    let p; try { p = new Intl.DateTimeFormat((L && L.language) || undefined, o).formatToParts(new Date()); } catch (e) { p = new Intl.DateTimeFormat(undefined, o).formatToParts(new Date()); }
    const main = p.filter((x) => x.type !== "dayPeriod").map((x) => x.value).join("").trim(), dp = p.find((x) => x.type === "dayPeriod");
    return this._esc(main) + (dp ? `<small>${this._esc(dp.value)}</small>` : "");
  }
  _fmt(n) { const v = Math.round(+n * 10) / 10; return Number.isInteger(v) ? String(v) : v.toFixed(1); }
  _sw(on, act, ids) { return `<button class="sw ${on ? "on" : ""}" data-act="${act}" data-e="${ids.join(",")}"></button>`; }
  _wx() {
    const S = this._h.states, id = Object.keys(S).find((i) => i.startsWith("weather."));
    if (!id) return null;
    const s = S[id], a = s.attributes;
    if (a.temperature == null) return null;
    const cond = WX[s.state] || String(s.state).replace(/[-_]/g, " "), ic = s.state === "sunny" ? SUN_I : s.state === "clear-night" ? MOON_I : CLOUD_I;
    let t = `${this._fmt(a.temperature)}° · ${cond}`;
    const sun = S["sun.sun"];
    if (sun) { const below = sun.state === "below_horizon", iso = below ? sun.attributes.next_rising : sun.attributes.next_setting; if (iso && !isNaN(Date.parse(iso))) t += ` · ${below ? "Sunrise" : "Sunset"} ${this._clock(new Date(iso))}`; }
    return { ic, t: this._esc(t), s: this._esc(`${Math.round(a.temperature)}° ${cond.toLowerCase()}`) };
  }
  _sec(i) {
    const s = this._h.states[i], d = i.split(".")[0], dc = s.attributes.device_class, v = s.state, cap = (x) => x.charAt(0).toUpperCase() + x.slice(1).replace(/_/g, " ");
    if (v === "unavailable" || v === "unknown") return ["Unavailable", ""];
    if (d === "alarm_control_panel") { const M = { disarmed: "Disarmed", armed_home: "Armed, home", armed_away: "Armed, away", armed_night: "Armed, night", armed_vacation: "Armed, vacation", armed_custom_bypass: "Armed, custom", arming: "Arming…", pending: "Pending", disarming: "Disarming…", triggered: "Triggered" }; return [M[v] || cap(v), v === "triggered" ? "b" : ""]; }
    if (d === "lock") return v === "locked" ? ["Locked", ""] : [cap(v), "w"];
    if (d === "cover") return v === "closed" ? ["Closed", ""] : [cap(v), "w"];
    if (["motion", "occupancy", "presence"].includes(dc)) return [v === "on" ? "Detected" : "Clear", ""];
    if (dc === "tamper") return v === "on" ? ["Tampered", "w"] : ["OK", ""];
    return v === "on" ? ["Open", "w"] : ["Closed", ""];
  }
  /* ---------- tiles, intercom, scenes ---------- */
  _groups(svc, ids) {
    const list = ids || this._ents(svc), set = new Set(list), out = [], seen = new Set();
    this._rooms().forEach((r) => { const g = list.filter((i) => this._roomOf(i) === r.id); if (g.length) out.push({ id: r.id, name: r.name, ids: g }); g.forEach((i) => seen.add(i)); });
    const rest = list.filter((i) => !seen.has(i) && set.has(i));
    if (rest.length) { if (!out.length) rest.forEach((i) => out.push({ id: i, name: this._nm(i), ids: [i] })); else out.push({ id: "other", name: "Other lights", ids: rest }); }
    return out;
  }
  _tileIds(svc) {
    const sel = (this._c.tiles || {})[svc], all = this._ents(svc), icc = this._ics().map((x) => x.camera);
    if (Array.isArray(sel)) return all.filter((i) => sel.includes(i));
    return svc === "cameras" ? all.filter((i) => !icc.includes(i)).slice(0, 2) : all;
  }
  _autoIds() { const H = this._h.states; return (this._c.autos || []).filter((i) => H[i]); }
  _autoRow(id) {
    const s = this._h.states[id], E = (t) => this._esc(t), d = id.split(".")[0], on = s.state === "on";
    const run = `<button class="rb2 runb" data-act="${d === "script" ? "script.turn_on" : "automation.trigger"}" data-e="${E(id)}" title="Run now">▶</button>`;
    const last = d === "automation" && s.attributes.last_triggered ? new Date(s.attributes.last_triggered).toLocaleString([], { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "";
    return `<div class="aur" data-id="au:${E(id)}"><div class="grow"><div class="nm2">${E(this._nm(id))}</div><div class="lbl">${d === "script" ? (on ? "Running" : "Script") : last ? "Last run " + E(last) : "Never run"}</div></div>${run}${d === "automation" ? this._sw(on, "automation.toggle", [id]) : ""}</div>`;
  }
  _autoCard(big) {
    const ids = this._autoIds(), E = (t) => this._esc(t), shown = big ? ids : ids.slice(0, 6), onN = ids.filter((i) => this._h.states[i].state === "on" && i.startsWith("automation.")).length, nA = ids.filter((i) => i.startsWith("automation.")).length;
    return `<div class="bc" data-id="b:automations"><div class="bh" ${this._tileGo("automations")}><span>${E(SV.automations.n)}</span><span class="bs">${nA ? onN + " of " + nA + " on" : ids.length + " scripts"}</span></div><div class="aul">${shown.map((i) => this._autoRow(i)).join("")}</div>${!big && ids.length > 6 ? `<div class="lbl" ${this._tileGo("automations")} style="cursor:pointer;margin-top:10px">+ ${ids.length - 6} more ›</div>` : ""}</div>`;
  }
  _autoPage() { return `${this._top()}<h1>${SV.automations.i} ${this._esc(SV.automations.n)}</h1><div style="max-width:780px;margin-top:10px">${this._autoCard(true)}</div>`; }
  _icCur() { const l = this._ics(); return l[Math.min(this._icSel || 0, l.length - 1)]; }
  _ics() { const c = this._c; if (!c.intercoms) { c.intercoms = c.intercom ? [{ id: "ic1", ...c.intercom }] : []; delete c.intercom; } return c.intercoms; }
  _icOk(ic) { return !!(ic && (ic.camera || (ic.door && ic.door.a) || (ic.audio && ic.audio.a))); }
  _icOn() { return this._ics().some((x) => this._icOk(x)); }
  _icList() { return this._ics().filter((x) => this._icOk(x)); }
  _icName(ic) { const l = this._ics(); return ic.name || (l.length > 1 ? SV.intercom.n + " " + (l.indexOf(ic) + 1) : SV.intercom.n); }
  _ringing(ic) {
    if (!ic) return this._icList().some((x) => this._ringing(x));
    const s = ic.bell && this._h.states[ic.bell]; if (!s) return false;
    if (ic.bell.startsWith("event.")) { const t = Date.parse(s.state); return !isNaN(t) && Date.now() - t < 30000; }
    return ["on", "ringing", "pressed", "true"].includes(s.state);
  }
  _run(o) {
    o = o || {}; const a = (o.a || "").trim(), tgt = (o.e || "").trim(), S = this._h.states; let data = {};
    if (!a) return false;
    if (o.d) { try { data = JSON.parse(o.d); } catch (e) { this._toast("Action data is not valid JSON"); return false; } }
    if (/^(https?:|tel:|sip:|sips:|facetime:|mailto:|intent:)/i.test(a)) { if (/^https?:/i.test(a)) window.open(a, "_blank"); else window.location.href = a; return true; }
    if (a.startsWith("/")) { history.pushState(null, "", a); window.dispatchEvent(new CustomEvent("location-changed")); return true; }
    if (S[a]) {
      const d = a.split(".")[0], M = { lock: (S[a].attributes.supported_features || 0) & 1 ? "open" : "unlock", button: "press", input_button: "press", script: "turn_on", scene: "turn_on", automation: "trigger", cover: "open_cover", valve: "open_valve" };
      this._h.callService(d, M[d] || "turn_on", { entity_id: a, ...data }); return true;
    }
    const m = /^([a-z_]+)\.([a-z0-9_]+)$/i.exec(a);
    if (m) { this._h.callService(m[1], m[2], { ...(tgt ? { entity_id: tgt } : {}), ...data }); return true; }
    this._toast("Action not recognised: " + a); return false;
  }
  _icAct(v) {
    const [kind, id] = v.split("|"), ic = this._ics().find((x) => x.id === id) || this._icList()[0] || {};
    if (kind === "video") {
      if (ic.video && ic.video.a) this._run(ic.video);
      if (ic.camera) { this._cam = ic.camera; this._camFb = false; return this._draw(true); }
      return this._toast("Choose the intercom camera in Settings → Intercom");
    }
    if (kind === "audio") { if (!(ic.audio && ic.audio.a)) return this._toast("Set the audio call in Settings → Intercom"); if (this._run(ic.audio)) this._toast("Calling…"); return; }
    if (kind === "door") {
      if (!(ic.door && ic.door.a)) return this._toast("Set the open-door action in Settings → Intercom");
      const key = "door:" + ic.id;
      if (this._arm !== key) { this._arm = key; clearTimeout(this._armT); this._armT = setTimeout(() => { this._arm = null; this._draw(true); }, 3500); return this._draw(true); }
      clearTimeout(this._armT); this._arm = null; if (this._run(ic.door)) this._toast("Door opened"); this._draw(true);
    }
  }
  _icCard(ic, big) {
    const H = this._h.states, E = (t) => this._esc(t), cam = ic.camera && H[ic.camera], ring = this._ringing(ic), door = this._arm === "door:" + ic.id;
    const pic = cam && cam.attributes.entity_picture && !["unavailable", "unknown"].includes(cam.state) ? this._h.hassUrl(cam.attributes.entity_picture) : "";
    const view = pic ? `<div class="cvw" data-cam="${ic.camera}"><img class="cam" data-src="${pic}" src="${pic}"><span class="cn">${E(this._nm(ic.camera))}</span><span class="live">${ring ? "Ringing" : "Live"}</span><span class="xp">⤢</span></div>` : `<div class="cvw" style="cursor:default;font-size:44px">${PHONE_I}</div>`;
    const b = (kind, ico, t, cls) => `<button class="icb ${cls || ""}" data-ic="${kind}|${E(ic.id)}">${ico}<span>${t}</span></button>`;
    const btns = [!ic.noVideo && b("video", VIDEO_I, "Video call"), !ic.noAudio && b("audio", PHONE_I, "Audio call"), !ic.noDoor && b("door", KEY_I, door ? "Tap again to open" : "Open door", "door " + (door ? "armed" : ""))].filter(Boolean);
    return `<div class="bc icm ${ring ? "ringing" : ""} ${big ? "bigic" : ""}" data-id="b:ic:${E(ic.id)}"><div class="bh" ${this._tileGo("intercom")}><span>${E(this._icName(ic))}</span><span class="bs">${ring ? '<b class="rg">Ringing</b>' : "Ready"}</span></div>${view}${btns.length ? `<div class="icr" style="grid-template-columns:repeat(${btns.length},1fr)">${btns.join("")}</div>` : ""}</div>`;
  }
  _icPage() {
    const l = this._icList(), hint = this._admin() && l.some((ic) => !(ic.door && ic.door.a && ic.audio && ic.audio.a && ic.camera)) ? `<div class="lbl" style="margin-top:14px">Finish the set-up in Settings → Intercom (camera, door-open action, audio call).</div>` : "";
    return `${this._top()}<h1>${SV.intercom.i} ${l.length > 1 ? SV.intercom.n + "s" : this._esc(this._icName(l[0] || {}))}</h1><div class="icgrid" style="margin-top:10px">${l.map((ic) => this._icCard(ic, true)).join("")}</div>${hint}`;
  }
  /* --- scenes: your own scenes are saved as a snapshot of device states --- */
  _lsc() { try { return JSON.parse(localStorage.getItem("quint_scenes") || "[]"); } catch (e) { return []; } }
  _lscSave(l) { try { localStorage.setItem("quint_scenes", JSON.stringify(l)); } catch (e) {} }
  _myScenes() { return [...(this._c.scenes || []).map((s) => ({ ...s, sc: "s" })), ...this._lsc().map((s) => ({ ...s, sc: "l" }))]; }
  _snapOf(id) {
    const s = this._h.states[id]; if (!s) return null;
    const a = s.attributes, d = id.split(".")[0], it = { e: id, st: s.state };
    if (d === "light" && s.state === "on") { if (a.brightness != null) it.b = a.brightness; if (a.color_mode === "color_temp" && a.color_temp_kelvin) it.k = a.color_temp_kelvin; else if (["hs", "rgb", "rgbw", "rgbww", "xy"].includes(a.color_mode) && a.rgb_color) it.rgb = a.rgb_color; }
    else if (d === "cover" && a.current_position != null) it.p = a.current_position;
    else if (d === "climate" && a.temperature != null) it.t = a.temperature;
    else if (d === "media_player" && a.volume_level != null) it.v = a.volume_level;
    else if (d === "fan" && a.percentage != null) it.p = a.percentage;
    return it;
  }
  _applyScene(sc) {
    const cs = (d, sv, x) => this._h.callService(d, sv, x);
    (sc.items || []).forEach((it) => {
      if (!this._h.states[it.e]) return;
      const d = it.e.split(".")[0], on = !["off", "closed", "standby", "unavailable", "unknown"].includes(it.st);
      if (d === "light") return it.st === "off" ? cs("light", "turn_off", { entity_id: it.e }) : cs("light", "turn_on", { entity_id: it.e, ...(it.b != null ? { brightness: it.b } : {}), ...(it.k ? { color_temp_kelvin: it.k } : it.rgb ? { rgb_color: it.rgb } : {}) });
      if (d === "cover") return it.p != null ? cs("cover", "set_cover_position", { entity_id: it.e, position: it.p }) : cs("cover", it.st === "closed" ? "close_cover" : "open_cover", { entity_id: it.e });
      if (d === "climate") { if (it.st === "off") return cs("climate", "turn_off", { entity_id: it.e }); cs("climate", "set_hvac_mode", { entity_id: it.e, hvac_mode: it.st }); if (it.t != null) cs("climate", "set_temperature", { entity_id: it.e, temperature: it.t }); return; }
      if (d === "media_player") { if (!on) return cs("media_player", "turn_off", { entity_id: it.e }); if (it.v != null) cs("media_player", "volume_set", { entity_id: it.e, volume_level: it.v }); return; }
      if (d === "fan") return on ? cs("fan", "turn_on", { entity_id: it.e, ...(it.p != null ? { percentage: it.p } : {}) }) : cs("fan", "turn_off", { entity_id: it.e });
      cs("homeassistant", on ? "turn_on" : "turn_off", { entity_id: it.e });
    });
    this._toast(sc.name + " ✓");
  }
  _sceneOn(sc) {
    const H = this._h.states, items = sc.items || [];
    if (!items.length) return false;
    return items.every((it) => {
      const s = H[it.e]; if (!s) return false;
      const a = s.attributes, d = it.e.split(".")[0], offIt = ["off", "closed", "standby"].includes(it.st);
      if (d === "light") return it.st === "off" ? s.state === "off" : s.state === "on" && (it.b == null || Math.abs((a.brightness || 0) - it.b) <= 13);
      if (d === "cover") return it.p != null ? Math.abs((a.current_position == null ? -99 : a.current_position) - it.p) <= 5 : s.state === it.st;
      if (d === "climate") return s.state === it.st && (it.t == null || a.temperature === it.t);
      if (d === "media_player") return (["off", "standby"].includes(s.state) === offIt) && (it.v == null || Math.abs((a.volume_level || 0) - it.v) < 0.06);
      return (["off", "closed", "standby"].includes(s.state)) === offIt;
    });
  }
  _scenes() {
    const H = this._h.states, out = this._myScenes().filter((s) => this._sceneOk(s)).map((s) => ({ key: s.sc + ":" + s.id, nm: s.name, on: this._sceneOn(s), mine: s, ha: "" }));
    const ids = Object.keys(H).filter((i) => i.startsWith("scene.") && !this._c.hide.includes(i));
    let best = "", bt = 0;
    ids.forEach((i) => { const t = Date.parse(H[i].state); if (t > bt) { bt = t; best = i; } });
    ids.forEach((i) => out.push({ key: i, nm: this._nm(i), on: i === best && Date.now() - bt < 6 * 3600e3, ha: i }));
    return out.slice(0, 12);
  }
  _scAct(a, v) {
    const find = (key) => { const [k, id] = [key.slice(0, key.indexOf(":")), key.slice(key.indexOf(":") + 1)]; return this._myScenes().find((s) => s.sc === k && s.id === id); };
    if (a === "run") { const s = find(v); if (s) this._applyScene(s); return; }
    if (a === "ckd") { try { if (v === "analog" || v === "digital") localStorage.setItem("quint_ck", v); else localStorage.removeItem("quint_ck"); } catch (e) {} this._last = null; return this._draw(true); }
    if (a === "ctd") { try { if (v === "1" || v === "0") localStorage.setItem("quint_ct", v); else localStorage.removeItem("quint_ct"); } catch (e) {} this._last = null; return this._draw(true); }
    if (a === "tsd") { try { if (TSIZES[v]) localStorage.setItem("quint_ts", v); else localStorage.removeItem("quint_ts"); } catch (e) {} this._applyTs(); return this._draw(true); }
    if (a === "ordreset") { try { localStorage.removeItem("quint_ord"); localStorage.removeItem("quint_svo"); } catch (e) {} this._toast("Back to the shared order"); return this._draw(true); }
    if (a === "new") { this._sd = { name: "", scope: this._admin() ? "s" : "l", room: "", q: "", sel: new Set(Object.keys(this._h.states).filter((i) => ["lights", "shades", "climate"].includes(this._svcOf(i)) && !this._c.hide.includes(i))) }; return this._draw(true); }
    if (a === "re") { const s = find(v); if (!s) return; this._sd = { name: s.name, scope: s.sc, room: s.room || "", q: "", edit: v, sel: new Set((s.items || []).map((x) => x.e)) }; return this._draw(true); }
    if (a === "del") {
      const s = find(v); if (!s) return;
      if (s.sc === "s" && !this._admin()) return this._toast("Only an admin can remove shared scenes");
      if (!confirm(`Delete scene "${s.name}"?`)) return;
      if (s.sc === "s") { this._c.scenes = (this._c.scenes || []).filter((x) => x.id !== s.id); this._save(); } else this._lscSave(this._lsc().filter((x) => x.id !== s.id));
      return this._draw(true);
    }
    const D = this._sd; if (!D) return;
    if (a === "cancel") { this._sd = null; return this._draw(true); }
    if (a === "tog") { D.sel.has(v) ? D.sel.delete(v) : D.sel.add(v); return this._draw(true); }
    if (a === "none") { D.sel.clear(); return this._draw(true); }
    if (a === "shown") { this._scList().forEach((i) => D.sel.add(i)); return this._draw(true); }
    if (a === "save") {
      const q = this.shadowRoot.getElementById("sc-name"), name = ((q && q.value) || D.name || "").trim().replace(/[<>"']/g, "").slice(0, 24), err = (t) => { const e = this.shadowRoot.getElementById("sc-err"); if (e) e.textContent = t; };
      if (!name) return err("Give the scene a name");
      const items = [...D.sel].map((i) => this._snapOf(i)).filter(Boolean);
      if (!items.length) return err("Pick at least one device");
      if (D.edit) {
        const [k, id] = [D.edit.slice(0, D.edit.indexOf(":")), D.edit.slice(D.edit.indexOf(":") + 1)];
        if (k === "s") { const x = (this._c.scenes || []).find((s) => s.id === id); if (x) { x.name = name; x.items = items; x.room = D.room || ""; this._save(); } }
        else { const l = this._lsc(), x = l.find((s) => s.id === id); if (x) { x.name = name; x.items = items; x.room = D.room || ""; this._lscSave(l); } }
      } else if (D.scope === "s" && this._admin()) { (this._c.scenes = this._c.scenes || []).push({ id: this._uid(), name, room: D.room || "", items }); this._save(); }
      else { const l = this._lsc(); l.push({ id: this._uid(), name, room: D.room || "", items }); this._lscSave(l); }
      this._sd = null; this._toast("Scene saved"); return this._draw(true);
    }
  }
  _scList() {
    const D = this._sd, ok = ["lights", "shades", "climate", "media"];
    return Object.keys(this._h.states).filter((i) => (ok.includes(this._svcOf(i)) || ["switch", "fan", "input_boolean"].includes(i.split(".")[0])) && !this._c.hide.includes(i) && this._entOk(i) && (!D.room || this._roomOf(i) === D.room) && (!D.q || (i + " " + this._nm(i)).toLowerCase().includes(D.q)));
  }
  _scDialog() {
    const D = this._sd; if (!D) return "";
    const E = (t) => this._esc(t), H = this._h.states, ids = this._scList().slice(0, 150), adm = this._admin();
    const grp = {};
    ids.forEach((i) => { const k = this._svcOf(i) || "other"; (grp[k] = grp[k] || []).push(i); });
    const rows = Object.keys(grp).map((k) => `<div class="gtl">${E(k === "other" ? "Switches" : SV[k].n)}</div>` + grp[k].map((i) => {
      const s = H[i], a = s.attributes, extra = a.brightness != null && s.state === "on" ? " · " + Math.round(a.brightness / 2.55) + "%" : a.current_position != null ? " · " + a.current_position + "%" : a.temperature != null ? " · " + a.temperature + "°" : "";
      return `<div class="srow2" data-id="sd:${i}"><div class="grow"><div class="nm2">${E(this._nm(i))}</div><div class="lbl">${E(s.state + extra)}</div></div><button class="sw ${D.sel.has(i) ? "on" : ""}" data-sc="tog|${i}"></button></div>`;
    }).join("")).join("");
    return `<div class="ov"><div class="dlg"><h1 style="font-size:28px">${D.edit ? "Update scene" : "New scene"}</h1>
      <div class="lbl" style="margin:6px 0 10px">Set your devices the way you want first, then save: the scene remembers their current state.</div>
      <input type="text" id="sc-name" placeholder="Scene name, e.g. Movie night" value="${E(D.name)}" maxlength="24">
      ${adm && !D.edit ? `<div class="lbl" style="margin:12px 0 4px">Who can use it</div><select data-sdf="scope"><option value="s" ${D.scope === "s" ? "selected" : ""}>Everyone</option><option value="l" ${D.scope === "l" ? "selected" : ""}>Only this device</option></select>` : ""}
      <div class="lbl" style="margin:12px 0 4px">Room · the scene is shown on this room's page and the list below is filtered to it</div><select data-sdf="room"><option value="">No room (home page only)</option>${this._rooms().map((r) => `<option value="${E(r.id)}" ${D.room === r.id ? "selected" : ""}>${E(r.name)}</option>`).join("")}</select>
      <div class="lbl" style="margin:12px 0 4px">Devices · ${D.sel.size} selected</div><input type="text" data-sdq placeholder="Search" value="${E(D.q)}">
      <div class="btns" style="margin:8px 0"><button data-sc="shown|">Select shown</button><button data-sc="none|">Clear</button></div>
      <div style="max-height:34vh;overflow:auto">${rows || '<div class="lbl">No devices found.</div>'}</div>
      <div class="err" id="sc-err"></div><div class="btns"><button data-sc="cancel|">Cancel</button><button class="pri" data-sc="save|">Save scene</button></div></div></div>`;
  }
  /* --- background for this device only (any user) --- */
  async _pickBgLocal(file) {
    try {
      const url = URL.createObjectURL(file), img = new Image();
      await new Promise((ok, no) => { img.onload = ok; img.onerror = no; img.src = url; });
      const sc = Math.min(1, 1280 / Math.max(img.width, img.height)), cv = document.createElement("canvas");
      cv.width = Math.round(img.width * sc); cv.height = Math.round(img.height * sc);
      cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height); URL.revokeObjectURL(url);
      this._bgLocal({ mode: "image", data: cv.toDataURL("image/jpeg", 0.75), ...(this._bgu() ? {} : { dim: 30 }) });
      this._draw(true);
    } catch (e) { this._toast("Could not use that photo"); }
  }
  _rimgs() { try { return JSON.parse(localStorage.getItem("quint_rimg") || "{}") || {}; } catch (e) { return {}; } }
  _rimgSave(m) { try { localStorage.setItem("quint_rimg", JSON.stringify(m)); return true; } catch (e) { this._toast("Not enough space for this photo"); return false; } }
  _rimgOf(r) { const l = this._rimgs()[r.id]; if (l) return l; return r.pic && this._rsrv && this._rsrv[r.id] ? this._rsrv[r.id] : ""; }
  _rimgDel(rid) {
    if (this._admin()) {
      this._h.callApi("DELETE", "quint/roomimg?id=" + encodeURIComponent(rid)).catch(() => {});
      if (this._rsrv) delete this._rsrv[rid];
      const r = this._c.rooms.find((x) => x.id === rid); if (r) delete r.pic; this._save();
    }
    const m = this._rimgs(); delete m[rid]; this._rimgSave(m); this._draw(true);
  }
  async _pickRoomImg(file, rid) {
    try {
      const url = URL.createObjectURL(file), img = new Image();
      await new Promise((ok, no) => { img.onload = ok; img.onerror = no; img.src = url; });
      const sc = Math.min(1, 1000 / Math.max(img.width, img.height)), cv = document.createElement("canvas");
      cv.width = Math.round(img.width * sc); cv.height = Math.round(img.height * sc);
      cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height); URL.revokeObjectURL(url);
      const data = cv.toDataURL("image/jpeg", 0.72);
      if (this._admin()) {
        await this._h.callApi("POST", "quint/roomimg", { id: rid, data });
        (this._rsrv = this._rsrv || {})[rid] = data; const r = this._c.rooms.find((x) => x.id === rid); if (r) r.pic = true; this._save();
        this._toast("Room photo saved for everyone"); this._draw(true);
      } else { const m = this._rimgs(); m[rid] = data; if (this._rimgSave(m)) { this._toast("Room photo saved on this device"); this._draw(true); } }
    } catch (e) { this._toast("Could not use that photo"); }
  }
  _pbControls(u, b) {
    return `<div class="swrow">${Object.keys(BG).map((k) => `<button class="swt ${b.mode !== "image" && b.preset === k ? "sel" : ""}" style="background:${SWATCH[k]}" title="${k}" data-pb="preset|${k}"></button>`).join("")}</div>
      <div class="lbl" style="margin-bottom:4px">Your own photo</div><input type="file" accept="image/*" data-pbfile="1" style="color:var(--mu);font-size:13px;max-width:100%">
      <div class="lbl" style="margin:14px 0 4px">Darken</div><input type="range" min="0" max="80" value="${+b.dim || 0}" data-pbr="dim">
      <div class="lbl" style="margin:10px 0 4px">Blur</div><input type="range" min="0" max="20" value="${+b.blur || 0}" data-pbr="blur">
      ${u ? `<div class="btns" style="margin-top:14px"><button data-pb="shared|">Use shared look</button></div>` : ""}`;
  }
  _persDialog() {
    if (!this._pers) return "";
    const u = this._bgu(), b = { preset: "midnight", mode: "preset", dim: 0, blur: 0, ...(u || this._c.bg || {}) };
    return `<div class="ov" data-pers="bg"><div class="dlg"><div class="shd"><span>Background</span><small>${u ? "this device only" : "shared by everyone"}</small></div>
      ${this._pbControls(u, b)}
      <div class="btns" style="margin-top:16px"><button class="pri" data-pers="close">Done</button></div></div></div>`;
  }
  _bento(k) { const r = this._bentoOne(k); return (Array.isArray(r) ? r : [r]).map((p) => ({ ...p, h: p.h.replace(/^<div /, `<div data-sk="${this._esc(k)}" `) })); }
  _bentoOne(k) {
    const c = this._c, H = this._h.states, st = (i) => H[i].state, S = SV[k], go = this._tileGo(k), E = (t) => this._esc(t), tiles = c.tiles || {};
    if (k === "camwall") return [];
    if (k === "clock") return { h: `<div class="bc ctk" data-id="b:clock"><div class="bh" style="cursor:default"><span>${S.n}</span></div>${this._clockBlock("tl")}<div class="dt">${E(new Date().toLocaleDateString((this._h.locale && this._h.locale.language) || undefined, { weekday: "long", day: "numeric", month: "long" }))}</div></div>`, w: 3 };
    if (k === "automations") return { h: this._autoCard(false), w: 3.2 };
    if (k === "intercom") return this._icList().map((ic) => ({ h: this._icCard(ic, false), w: 4.4 }));
    const hd = (r, ic) => `<div class="bh" ${go}><span>${S.n}</span><span class="bs">${r || ""}${ic || ""}</span></div>`;
    const WT = { security: 5, cameras: 2.5, climate: 3, media: 3, shades: 4.2 }, wrap = (cls, inner, id, w) => ({ h: `<div class="bc ${cls}" data-id="${E(id || "b:" + k)}">${inner}</div>`, w: w || WT[k] || 2.4, wide: /(^| )wide( |$)/.test(cls) });
    const none = `<div class="lbl" style="padding:6px 0">No devices selected. Choose them in Settings → Tiles.</div>`;
    const ids = isCs(k) ? [] : this._tileIds(k), isOff = (i) => ["off", "unavailable", "unknown"].includes(st(i));
    this._pick = this._pick || {};
    const pickSeg = (svc, list, pk) => list.length > 1 ? `<div class="seg sm">${list.slice(0, 4).map((i) => `<button class="${i === pk ? "on" : ""}" data-pick="${svc}|${i}">${E(this._nm(i))}</button>`).join("")}</div>` : "";
    if (k === "lights") {
      const explicit = Array.isArray(tiles.lights), gr = explicit && ids.length <= 5 ? ids.map((i) => ({ id: i, name: this._nm(i), ids: [i] })) : this._groups("lights", ids);
      const onN = ids.filter((i) => st(i) === "on").length, dimOf = (g) => g.ids.some((i) => !(H[i].attributes.supported_color_modes || []).every((m) => m === "onoff"));
      const rows = gr.slice(0, 5).map((g) => {
        const on = g.ids.filter((i) => st(i) === "on"), br = on.map((i) => H[i].attributes.brightness).filter((b) => b != null), pct = br.length ? Math.round(br.reduce((a, b) => a + b, 0) / br.length / 2.55) : 0;
        const sub = !on.length ? "Off" : g.ids.length > 1 ? `${on.length} of ${g.ids.length} on${br.length ? " · " + pct + "%" : ""}` : br.length ? pct + "%" : "On";
        return `<div class="lt" data-id="lr:${E(g.id)}"><div class="lt1"><div class="ltn"><b>${E(g.name)}</b><small>${sub}</small></div>${this._sw(on.length > 0, on.length ? "light.turn_off" : "light.turn_on", g.ids)}</div>${dimOf(g) ? `<input type=range min=1 max=100 value=${Math.max(1, pct)} data-slider="light|turn_on|brightness_pct|1" data-e="${g.ids.join(",")}">` : ""}</div>`;
      }).join("");
      const ent = ids.join(",");
      return wrap("", `${hd(ids.length ? `${onN} of ${ids.length} on` : "")}${ids.length ? `<div class="lts">${rows}</div>${gr.length > 5 ? `<div class="lbl" ${go} style="cursor:pointer;margin-top:10px">+ ${gr.length - 5} more ›</div>` : ""}<div class="btn2"><button data-act="light.turn_on" data-e="${ent}">All on</button><button data-act="light.turn_off" data-e="${ent}">All off</button></div>` : none}`, "", 1.6 + Math.min(5, gr.length) * 1.5);
    }
    if (k === "cameras") {
      const out = ids.map((id) => {
        const a = H[id].attributes, off = ["unavailable", "unknown"].includes(st(id)) || !a.entity_picture, src = off ? "" : this._h.hassUrl(a.entity_picture);
        return wrap("cam1", off ? `<div class="cvw" style="cursor:default"><span class="cn">${E(this._nm(id))}</span><span>Offline</span></div>` : `<div class="cvw" data-cam="${id}"><img class="cam" data-src="${src}" src="${src}"><span class="cn">${E(this._nm(id))}</span><span class="live">Live</span><span class="xp">⤢</span></div>`, "b:cam:" + id);
      });
      return out.length ? out : wrap("", `${hd("")}${none}`);
    }
    if (k === "security") {
      if (!ids.length) return wrap("", `${hd("", SHIELD_I)}${none}`);
      const dom = (i) => i.split(".")[0], isM = (i) => ["motion", "occupancy", "presence"].includes(H[i].attributes.device_class), lim = Array.isArray(tiles.security) ? 6 : 4;
      const al = ids.filter((i) => dom(i) === "alarm_control_panel"), lk = ids.filter((i) => dom(i) === "lock"), oth = ids.filter((i) => !al.includes(i) && !lk.includes(i));
      const rows = [...al, ...lk, ...oth.filter((i) => !isM(i)), ...oth.filter(isM)].slice(0, lim).map((i) => { const [t, cl] = this._sec(i); return `<div class="rw" data-id="sr:${i}"><span class="nmx">${E(this._nm(i))}</span><span class="v ${cl}">${E(t)}</span></div>`; }).join("");
      const lv = ids.map((i) => this._sec(i)[1]), nb = lv.filter((x) => x === "b").length, nw = lv.filter((x) => x === "w").length, cls = nb ? "b" : nw ? "w" : "";
      const ap = al[0], seg = ap ? `<div class="seg">${[["Off", "alarm_disarm", "disarmed"], ["Home", "alarm_arm_home", "armed_home"], ["Night", "alarm_arm_night", "armed_night"], ["Away", "alarm_arm_away", "armed_away"]].map(([l, s, x]) => `<button class="${st(ap) === x ? "on" : ""}" data-act="alarm_control_panel.${s}" data-e="${ap}">${l}</button>`).join("")}</div>` : "";
      return wrap("", `${hd("", SHIELD_I)}<div class="st2"><span class="sd ${cls}"></span>${nb ? "Alarm triggered" : nw ? `${nw} open` : "All secure"}</div><div class="rows">${rows}</div>${seg}`);
    }
    if (k === "climate") {
      if (!ids.length) return wrap("", `${hd("")}${none}`);
      const id = ids.includes(this._pick.climate) ? this._pick.climate : ids.find((i) => !isOff(i)) || ids[0], a = H[id].attributes, off = isOff(id);
      const cur = a.current_temperature != null ? a.current_temperature : a.temperature, tg = a.temperature, step = a.target_temp_step || 0.5, rm = this._rooms().find((r) => r.id === this._roomOf(id));
      const verb = a.hvac_action === "heating" ? "Heating to " : a.hvac_action === "cooling" ? "Cooling to " : "Set to ";
      const cap = (off ? "Off" : tg != null ? verb + this._fmt(tg) + "°" : st(id)) + (a.current_humidity != null ? ` · humidity ${a.current_humidity}%` : "");
      const x = (v) => `{"temperature":${Math.round(v * 10) / 10}}`;
      const bt = tg != null && !off ? `<div class="rbs"><button class="rb2" data-act="climate.set_temperature" data-e="${id}" data-x='${x(tg - step)}'>−</button><button class="rb2" data-act="climate.set_temperature" data-e="${id}" data-x='${x(+tg + step)}'>+</button></div>` : "";
      return wrap("", `${hd(E(rm ? rm.name : this._nm(id)))}<div class="cl"><div><div class="sbig">${cur != null ? this._fmt(cur) : "–"}<sup>°</sup></div><div class="cap2">${E(cap)}</div></div>${bt}</div>${pickSeg("climate", ids, id)}`);
    }
    if (k === "media") {
      if (!ids.length) return wrap("wide", `${hd("")}${none}`);
      const pick = ids.includes(this._pick.media) ? this._pick.media : ["playing", "paused", "on", "idle"].map((s) => ids.find((i) => st(i) === s)).find(Boolean) || ids[0], a = H[pick].attributes, playing = ids.filter((i) => st(i) === "playing");
      const art = a.entity_picture ? this._h.hassUrl(a.entity_picture) : "", names = (playing.length ? playing : [pick]).map((i) => this._nm(i));
      const joined = names.length > 1 ? names.slice(0, -1).join(", ") + " and " + names[names.length - 1] : names[0], isP = st(pick) === "playing";
      const cap = (playing.length ? "Playing on " : st(pick) === "paused" ? "Paused on " : "") + joined;
      const ctl = (act, ic, cls) => `<button ${cls ? `class="${cls}"` : ""} data-act="media_player.${act}" data-e="${pick}">${ic}</button>`;
      return wrap("wide", `<div class="md"><div class="art">${art ? `<img src="${art}">` : MUSIC_I}</div><div class="mt"><div class="pc" ${go} style="cursor:pointer">${E(cap)}</div><div class="tt">${E(a.media_title || (isP ? "Playing" : "Nothing playing"))}</div>${a.media_artist ? `<div class="ar">${E(a.media_artist)}</div>` : ""}</div><div class="mc">${ctl("media_previous_track", PREV_I)}${ctl("media_play_pause", isP ? PAUSE_I : PLAY_I, "pp")}${ctl("media_next_track", NEXT_I)}</div><div class="vol">${VOL_I}<input type=range min=0 max=100 value=${Math.round((a.volume_level || 0) * 100)} data-slider="media_player|volume_set|volume_level|100" data-e="${pick}"></div></div>${pickSeg("media", ids, pick)}`);
    }
    if (k === "shades") {
      if (!ids.length) return wrap("", `${hd("")}${none}`);
      const pos = ids.map((i) => H[i].attributes.current_position).filter((p) => p != null), avg = pos.length ? Math.round(pos.reduce((a, b) => a + b, 0) / pos.length) : null;
      const all = ids.join(","), shown = ids.slice(0, 4);
      return wrap("", `${hd(avg != null ? `${ids.length} window${ids.length === 1 ? "" : "s"} · ${avg}% open` : `${ids.length} window${ids.length === 1 ? "" : "s"}`)}<div class="wrow">${shown.map((i) => this._winMini(i)).join("")}</div>${ids.length > 4 ? `<div class="lbl" ${go} style="cursor:pointer;text-align:center;margin-top:2px">+ ${ids.length - 4} more ›</div>` : ""}<div class="btn3"><button data-act="cover.open_cover" data-e="${all}">Open</button><button data-act="cover.set_cover_position" data-e="${all}" data-x='{"position":50}'>Half</button><button data-act="cover.close_cover" data-e="${all}">Close</button></div>`);
    }
    const t = this._stats(k);
    return wrap("", `${hd("", S.i)}<div class="cnt">${t.big}</div><div class="cap2">${t.big ? t.lbl : "No cards yet · tap to open"}</div>`);
  }
  _ts() { let u = ""; try { u = localStorage.getItem("quint_ts") || ""; } catch (e) {} return TSIZES[u] ? u : TSIZES[this._c && this._c.tsz] ? this._c.tsz : "l"; }
  _applyTs() {
    const k = this._ts(), z = TSIZES[k].z, i = ["xl", "l", "s", "xs"].indexOf(k), phone = this.getAttribute("data-dev") === "phone", st = this.style;
    this._z = z; this._m = TSIZES[k].m;
    const set = (n, v) => { if (st.getPropertyValue(n) !== String(v)) st.setProperty(n, String(v)); };
    set("--z", z); set("--tm", TSIZES[k].m); set("--pc", [1, 2, 3, 4][i]); set("--pc2", [1, 1, 2, 2][i]); set("--abn", phone ? [1, 1, 2, 2][i] : [1, 2, 3, 4][i]);
    if (this.getAttribute("data-ts") !== k) this.setAttribute("data-ts", k);
  }
  _cols() {
    const w = this._w || 1024, wide = this.getAttribute("data-wide") === "1", area = wide ? w - Math.min(390, w * 0.3) - 40 - 88 : w - 56;
    const m = this._m || 1;
    return Math.max(1, Math.min(m < 1 ? 4 : 3, Math.floor((area + 16) / (316 * m))));
  }
  _home() {
    const c = this._c, hr = new Date().getHours(), g = hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";
    const who = c.name || (this._h.user && this._h.user.name) || "", L = this._svcsHome(), wx = c.noWeather ? null : this._wx(), sc = c.noScenes ? [] : this._scenes(), E = (t) => this._esc(t);
    const date = new Date().toLocaleDateString((this._h.locale && this._h.locale.language) || undefined, { weekday: "long", day: "numeric", month: "long" });
    const scBtn = (s) => {
      if (s.ha) return `<div class="scw" data-id="sc:${E(s.key)}"><button class="scb ${s.on ? "on" : ""}" data-act="scene.turn_on" data-e="${s.ha}"><i></i><span>${E(s.nm)}</span></button></div>`;
      return `<div class="scw" data-id="sc:${E(s.key)}"><button class="scb ${s.on ? "on" : ""}" data-sc="run|${E(s.key)}"><i></i><span>${E(s.nm)}</span></button></div>`;
    };
    const scn = c.noScenes ? "" : `<div class="scn"><div class="cap"><span>Scenes</span></div>${sc.length ? `<div class="scg">${sc.map(scBtn).join("")}</div>` : `<div class="hintx">${this._admin() ? "Add scenes in Settings → Scenes." : "No scenes yet."}</div>`}</div>`;
    const left = `<div class="hl">${this._brand()}${c.noClock ? "" : this._clockBlock("left")}<div class="dt">${E(date)}</div>${wx ? `<div class="wx">${wx.ic}<span>${wx.t}</span></div>` : ""}<div class="gr">${g}${who ? ", " + E(who) : ""}</div>${scn}</div>`;
    const parts = L.flatMap((k) => this._bento(k)), n = this._cols(), cr = this._credit();
    this._colsN = n;
    const cols = Array.from({ length: n }, () => ({ h: "", w: 0 }));
    parts.filter((p) => !p.wide).forEach((p) => { const m = cols.reduce((a, b) => (b.w < a.w ? b : a)); m.h += p.h; m.w += p.w; });
    const wideH = parts.filter((p) => p.wide).map((p) => p.h).join("");
    const bento = parts.length ? `<div class="bento" style="--cols:${n}">${cols.map((x, i) => `<div class="bcol" data-id="col:${i}">${x.h}</div>`).join("")}</div>${wideH ? `<div class="bwide">${wideH}</div>` : ""}` : '<div class="bc">No supported devices found.</div>';
    return `<div class="home">${left}<div class="hr">${bento}${this._homeCards()}${cr ? `<div class="crm">${cr}</div>` : ""}</div></div>`;
  }
  _areaPage() {
    const rs = this._rooms(), L = this._svcs(), adm = this._admin(), H = this._h.states, st = (i) => H[i].state, E = (t) => this._esc(t);
    const has = (r, s) => (isCs(s) ? this._csItems(r.id, s).length : this._ents(s, r.id).length);
    const room = rs.find((r) => r.id === this._v.room) || rs.find((r) => L.some((s) => has(r, s))) || rs[0];
    if (!room) return `<div class="area"><div class="rl">${this._brand()}</div><div class="bc">No rooms yet. Add rooms in Settings.</div></div>`;
    const rid = room.id, wx = this._c.noWeather ? null : this._wx();
    const fls = (this._c.floors || []).filter((f) => rs.some((r) => r.floor === f.id)), loose = rs.filter((r) => !r.floor || !(this._c.floors || []).some((f) => f.id === r.floor));
    const tabsF = fls.length ? [...fls.map((f) => ({ id: f.id, name: f.name })), ...(loose.length ? [{ id: "", name: "Other" }] : [])] : [];
    const curF = tabsF.length ? (tabsF.find((f) => f.id === (room.floor && (this._c.floors || []).some((x) => x.id === room.floor) ? room.floor : "")) || tabsF[0]).id : null;
    const inF = (r) => curF === null || (curF === "" ? loose.includes(r) : r.floor === curF);
    const floorBar = tabsF.length > 1 ? `<div class="seg fl">${tabsF.map((f) => { const first = rs.find((r) => (f.id === "" ? loose.includes(r) : r.floor === f.id)); return `<button class="${f.id === curF ? "on" : ""}" data-id="fl:${E(f.id || "_")}" data-go='${JSON.stringify({ p: "room", room: first.id })}'>${E(f.name)}</button>`; }).join("")}</div>` : "";
    const list = rs.filter(inF).map((r) => { const l = L.includes("lights") ? this._ents("lights", r.id) : [], on = l.filter((i) => st(i) === "on").length; return `<button class="rli ${r.id === rid ? "act" : ""}" data-id="rl:${E(r.id)}" data-go='${JSON.stringify({ p: "room", room: r.id })}'><span>${E(r.name)}</span><small class="${on ? "" : "off"}">${l.length ? (on ? on + " on" : "Off") : ""}</small></button>`; }).join("");
    const lights = L.includes("lights") ? this._ents("lights", rid) : [], onL = lights.filter((i) => st(i) === "on");
    const cl = L.includes("climate") ? this._ents("climate", rid) : [], sh = L.includes("shades") ? this._ents("shades", rid) : [];
    const pos = sh.map((i) => H[i].attributes.current_position).filter((p) => p != null), avg = pos.length ? Math.round(pos.reduce((a, b) => a + b, 0) / pos.length) : null;
    const sub = [lights.length ? `${onL.length} of ${lights.length} lights on` : "", cl.length && H[cl[0]].attributes.current_temperature != null ? this._fmt(H[cl[0]].attributes.current_temperature) + "°" : "", avg != null ? `${SV.shades.n.toLowerCase()} ${avg}% open` : ""].filter(Boolean).join(" · ");
    const scenes = Object.keys(H).filter((i) => i.startsWith("scene.") && !this._c.hide.includes(i) && this._roomOf(i) === rid);
    this._roomBg = this._rimgOf(room);
    const mySc = this._c.noScenes ? [] : this._myScenes().filter((x) => x.room === rid && this._sceneOk(x));
    const chips = scenes.length || mySc.length ? `<div class="chips">${mySc.map((x) => `<button class="scb ${this._sceneOn(x) ? "on" : ""}" data-id="sc:${x.sc}:${x.id}" data-sc="run|${x.sc}:${x.id}"><i></i><span>${E(x.name)}</span></button>`).join("")}${scenes.map((i) => `<button class="scb" data-id="sc:${i}" data-act="scene.turn_on" data-e="${i}"><i></i><span>${E(this._nm(i))}</span></button>`).join("")}</div>` : "";
    const sec = [];
    [...L.filter((x) => ["lights", "shades", "climate"].includes(x)).sort((p, q) => ["lights", "shades", "climate"].indexOf(p) - ["lights", "shades", "climate"].indexOf(q)), ...L.filter((x) => !["lights", "shades", "climate"].includes(x))].forEach((s) => {
      if (!has(room, s)) return;
      if (isCs(s) && !this._csItems(rid, s).some((x) => !x.it.tile)) return;
      if (s === "lights") {
        const rows = lights.map((i) => {
          const a = H[i].attributes, isOn = st(i) === "on", b = a.brightness || 0, dim = !(a.supported_color_modes || []).every((m) => m === "onoff") && st(i) !== "unavailable";
          return `<div class="lr" data-id="l:${i}"><button class="ln" data-act="light.toggle" data-e="${i}">${E(this._nm(i))}</button>${dim ? `<input type=range min=1 max=255 value=${b} data-slider="light|turn_on|brightness|1" data-e="${i}"><span class="lp">${isOn ? Math.round(b / 2.55) + "%" : "Off"}</span>` : `<span></span>${this._sw(isOn, "light.toggle", [i])}`}</div>`;
        }).join("");
        sec.push(`<div class="bc tall" data-sk="lights" data-id="a:lights"><div class="bh" ${this._tileGo(s)}><span>${SV.lights.n}</span><span class="bs">${onL.length} on</span></div>${rows}</div>`);
      } else if (s === "shades") {
        const all = sh.join(",");
        sec.push(`<div class="bc span2" data-sk="shades" data-id="a:shades"><div class="bh" ${this._tileGo(s)}><span>${SV.shades.n}</span><span class="bs">${sh.length} window${sh.length === 1 ? "" : "s"}${avg != null ? " · " + avg + "% open" : ""}</span></div><div class="shg">${sh.map((i) => this._kw("e:" + i, this._shadeCard(i))).join("")}</div>${sh.length > 1 ? `<div class="btn3"><button data-act="cover.open_cover" data-e="${all}">Open all</button><button data-act="cover.set_cover_position" data-e="${all}" data-x='{"position":50}'>Half</button><button data-act="cover.close_cover" data-e="${all}">Close all</button></div>` : ""}</div>`);
      } else if (s === "climate") {
        const x = (v) => `{"temperature":${Math.round(v * 10) / 10}}`;
        const rows = cl.map((id) => {
          const a = H[id].attributes, off = ["off", "unavailable", "unknown"].includes(st(id)), tg = a.temperature, step = a.target_temp_step || 0.5;
          const verb = a.hvac_action === "heating" ? "heating to " : a.hvac_action === "cooling" ? "cooling to " : "set to ";
          const txt = `${a.current_temperature != null ? this._fmt(a.current_temperature) + "° now" : st(id)}${off ? " · off" : tg != null ? " · " + verb + this._fmt(tg) + "°" : ""}`;
          return `<div class="cl" data-id="cl:${E(id)}"><div>${cl.length > 1 ? `<div class="lbl" style="margin:0 0 2px">${E(this._nm(id))}</div>` : ""}<div class="cap2" style="margin:0;font-size:15px">${E(txt)}</div></div>${tg != null && !off ? `<div class="rbs"><button class="rb2" data-act="climate.set_temperature" data-e="${id}" data-x='${x(tg - step)}'>−</button><button class="rb2" data-act="climate.set_temperature" data-e="${id}" data-x='${x(+tg + step)}'>+</button></div>` : ""}</div>`;
        }).join("");
        sec.push(`<div class="bc" data-sk="climate" data-id="a:climate"><div class="bh" ${this._tileGo(s)}><span>${SV.climate.n}</span>${cl.length > 1 ? `<span class="bs">${cl.length} thermostats</span>` : ""}</div>${rows}</div>`);
      } else {
        const inner = isCs(s) ? this._customCards(rid, "room:" + rid + ":" + s, s, false, true) : this._cardsOf(this._ents(s, rid), "room:" + rid + ":" + s);
        sec.push(`<div class="bc ${s === "media" || s === "cameras" ? "span2" : ""}" data-sk="${E(s)}" data-id="a:${E(s)}"><div class="bh" ${this._tileGo(s)}><span>${SV[s].n}</span></div><div class="grid" data-grid="room:${rid}:${s}">${inner}</div></div>`);
      }
    });
    { const tl = this._roomTiles(rid), ci = sec.findIndex((h) => !/data-sk="(lights|shades|climate)"/.test(h)); sec.splice(ci < 0 ? sec.length : ci, 0, ...tl); }
    if (!sec.length) sec.push(`<div class="bc span2" data-id="a:none"><div class="lbl">Nothing in this room yet.</div></div>`);
    if (adm) sec.push(`<div class="tile add span2" data-id="a:add" data-cc="open:${rid}"><div class="bdg" style="--c:#8d9ab8">＋</div><div class="nm">Add card</div></div>`);
    return `<div class="area"><div class="rl">${this._brand()}<div class="cap rcap">Rooms</div>${floorBar}<div class="rlist">${list}</div><div class="ft"><span class="tm">@@T@@</span>${wx ? " · " + wx.s : ""}</div></div><div class="rm2"><div class="ah"><div><h1>${E(room.name)}</h1>${sub ? `<div class="sub">${E(sub)}</div>` : ""}</div>${lights.length ? `<div class="ahb"><button class="ob2" data-act="light.turn_off" data-e="${lights.join(",")}">All off</button></div>` : ""}</div>${chips}<div class="abody">${sec.join("")}</div></div></div>`;
  }
  /* ---------- camera wall: one screen with 1 to 32 cameras ---------- */
  _wallCfg() { const w = this._c.wall || {}; return { n: Math.max(1, Math.min(32, Math.round(+w.n) || 4)), ids: Array.isArray(w.ids) ? w.ids : [], live: w.live !== false, max: [4, 8, 12, 16].includes(+w.max) ? +w.max : 0, names: w.names !== false }; }
  _wallAll() { return Object.keys(this._h.states).filter((id) => this._svcOf(id) === "cameras" && !this._c.hide.includes(id) && this._rmOk(this._roomOf(id))).sort((a, b) => this._nm(a).localeCompare(this._nm(b))); }
  _wallCams() {
    const w = this._wallCfg(), all = this._wallAll(), ch = w.ids.filter((i) => all.includes(i));
    return (ch.length ? ch : all).slice(0, w.n);
  }
  _camList() { return (this._v.p === "camwall" ? this._wallCams() : this._ents("cameras")).filter((i) => this._h.states[i] && this._h.states[i].attributes.entity_picture); }
  _wallGrid(n) {
    const dev = this.getAttribute("data-dev") || "desktop", padX = dev === "phone" ? 28 : dev === "tablet" ? 56 : 88;
    const W = Math.max(240, (this._w || 1024) - padX), H = Math.max(200, (this.clientHeight || 700) - (dev === "phone" ? 150 : 190)), gap = n > 16 ? 6 : 10;
    let best = null;
    for (let c = 1; c <= n; c++) {
      const r = Math.ceil(n / c), cw = (W - gap * (c - 1)) / c, ch = (H - gap * (r - 1)) / r;
      if (cw <= 20 || ch <= 20) continue;
      const score = Math.abs(Math.log(cw / ch / (16 / 9))) + (r * c - n) * 0.12;
      if (!best || score < best.score) best = { c, r, score };
    }
    if (!best) best = { c: Math.ceil(Math.sqrt(n)), r: Math.ceil(n / Math.ceil(Math.sqrt(n))), score: 0 };
    const minH = 96, height = Math.max(H, best.r * minH + gap * (best.r - 1));
    return { ...best, gap, height };
  }
  _wallPage() {
    const E = (t) => this._esc(t), H = this._h.states, w = this._wallCfg(), ids = this._wallCams();
    if (!ids.length) return `${this._top()}<h1>${SV.camwall.i} ${E(SV.camwall.n)}</h1><div class="bc" style="max-width:640px;margin-top:10px"><div class="lbl">No cameras to show yet.${this._admin() ? " Choose them in Settings → Camera wall." : ""}</div></div>`;
    const g = this._wallGrid(ids.length), small = g.c >= 5 || ids.length > 12;
    this._wallKey = `${ids.length}:${g.c}:${g.r}`;
    const ha = this._haOn(), room = ha || this._h2() ? ids.length : ids.length <= 4 ? 4 : ids.length <= 8 ? 3 : 2, liveMax = Math.min(room, w.max || 99), dpr = Math.min(2, window.devicePixelRatio || 1), tw = ((this._w || 1024) / g.c) * dpr, px = Math.max(320, Math.min(1280, Math.ceil(tw / 160) * 160));
    let nl = 0;
    const tiles = ids.map((id) => {
      const a = H[id].attributes, off = ["unavailable", "unknown"].includes(H[id].state) || !a.entity_picture, nm = w.names ? `<span class="cn">${E(this._nm(id))}</span>` : "";
      if (off) return `<div class="cvw wt" data-id="w:cam:${E(id)}" style="cursor:default">${nm}<span class="wo">Offline</span></div>`;
      const snap = this._h.hassUrl(a.entity_picture), live = w.live && nl < liveMax && !(this._wallFb || new Set()).has(id);
      if (live) nl++;
      const sized = snap + (snap.includes("?") ? "&" : "?") + "width=" + px;
      const img = live && ha && !(this._haBad || new Set()).has(id) ? this._haHost(id, true, snap) : live ? `<img class="wallx" data-wid="${E(id)}" data-src="${E(snap.replace("/camera_proxy/", "/camera_proxy_stream/"))}" src="${E(snap.replace("/camera_proxy/", "/camera_proxy_stream/"))}">` : `<img class="cam" decoding="async" data-src="${E(sized)}" src="${E(sized)}">`;
      return `<div class="cvw wt" data-cam="${E(id)}" data-id="w:cam:${E(id)}">${img}${nm}<span class="live">Live</span></div>`;
    }).join("");
    return `${this._top()}<div class="wallg ${small ? "sm" : ""}" style="grid-template-columns:repeat(${g.c},minmax(0,1fr));grid-template-rows:repeat(${g.r},minmax(0,1fr));gap:${g.gap}px;height:${g.height}px">${tiles}</div>`;
  }
  _camView() {
    const id = this._cam, s = id && this._h.states[id];
    if (!s || !s.attributes.entity_picture) return "";
    const E = (t) => this._esc(t), cams = this._camList();
    const snap = this._h.hassUrl(s.attributes.entity_picture), stream = snap.replace("/camera_proxy/", "/camera_proxy_stream/");
    if (this._camId !== id) { this._camId = id; this._camSince = Date.now(); }
    const ic = this._icList().find((x) => x.camera === id) || {}, armed = this._arm === "door:" + ic.id;
    const vb = [!ic.noAudio && `<button class="icb" data-ic="audio|${E(ic.id || "")}">${PHONE_I}<span>Audio call</span></button>`, !ic.noDoor && `<button class="icb door ${armed ? "armed" : ""}" data-ic="door|${E(ic.id || "")}">${KEY_I}<span>${armed ? "Tap again to open" : "Open door"}</span></button>`].filter(Boolean);
    const ictl = ic.id && vb.length ? `<div class="vic">${vb.join("")}</div>` : "";
    const arrows = cams.length > 1 ? `<button class="ib" data-cam="prev">‹</button><button class="ib" data-cam="next">›</button>` : "";
    return `<div class="camv" data-cam="bg"><div class="vh"><span class="live">Live</span><span class="vt">${E(this._nm(id))}</span><span class="grow"></span>${arrows}<button class="ib" data-cam="close">✕</button></div><div class="vb">${this._haOn() && !this._camFb && !(this._haBad || new Set()).has(id) ? this._haHost(id, false, snap) : ""}${this._haOn() && !this._camFb && !(this._haBad || new Set()).has(id) ? "" : `<img class="camx" data-cam="keep" data-src="${stream}" data-snap="${snap}" style="background:#000 url('${E(snap)}') center/contain no-repeat" src="${this._camFb ? snap : stream}">`}</div>${ictl}<div class="vf">${cams.map((i) => `<button class="cc2 ${i === id ? "on" : ""}" data-id="cc:${i}" data-cam="${i}">${E(this._nm(i))}</button>`).join("")}</div></div>`;
  }
  _roomsPage() {
    const s = this._v.svc;
    if (isCs(s)) return this._csPage(s);
    const act = (i) => { const st = this._h.states[i].state; return s === "lights" ? st === "on" : s === "shades" ? ["open", "opening"].includes(st) : this._isOn(i); };
    const sec = (title, ids, rid) => {
      const on = ids.filter(act).length, all = ids.join(",");
      const btn = s === "lights" ? `<button data-act="light.turn_on" data-e="${all}">All on</button><button data-act="light.turn_off" data-e="${all}">All off</button>`
        : s === "shades" ? `<button data-act="cover.open_cover" data-e="${all}">Open all</button><button data-act="cover.close_cover" data-e="${all}">Close all</button>` : "";
      const go = rid ? `data-go='${JSON.stringify({ p: "room", room: rid, svc: s })}'` : "";
      return `<section><div class="rh"><div class="grow" ${go}><div class="rn">${title}</div><div class="lbl">${on} active of ${ids.length}</div></div><div class="btns rb">${btn}</div></div><div class="grid" data-grid="svc:${s}:${rid || "other"}" ${s === "shades" ? 'style="grid-template-columns:repeat(auto-fill,minmax(310px,1fr))"' : ""}>${this._cardsOf(ids, "svc:" + s + ":" + (rid || "other"))}</div></section>`;
    };
    const rs = this._svcRooms(s), known = new Set(this._rooms().map((r) => r.id));
    const parts = rs.map((r) => [r, this._ents(s, r.id)]).filter(([, e]) => e.length).map(([r, e]) => sec(r.name, e, r.id));
    const other = this._ents(s).filter((i) => !known.has(this._roomOf(i)));
    if (other.length) parts.push(sec("Other", other, ""));
    const total = this._ents(s).filter(act).length;
    return `${this._top()}<h1>${SV[s].i} ${SV[s].n}</h1><div class="sub">${total} active · grouped by room</div>${parts.join("")}`;
  }
  _list(s) {
    return `${this._top()}<h1>${SV[s].i} ${SV[s].n}</h1><div class="grid" data-grid="list:${s}" style="grid-template-columns:repeat(auto-fill,minmax(calc(${s === "cameras" ? 320 : 200}px * var(--tm,1)),1fr))">${this._cardsOf(this._ents(s), "list:" + s)}</div>`;
  }
  _settings() {
    const E = (t) => this._esc(t), c = this._c; let tab = this._v.tab || "general";
    const row = (l, sub, ctl) => `<div class="srow"><div class="sl"><div class="sn">${l}</div>${sub ? `<div class="ss">${sub}</div>` : ""}</div><div class="sc">${ctl}</div></div>`;
    const sec = (t, note, rows) => `<div class="ssec"><div class="shd"><span>${t}</span>${note ? `<small>${note}</small>` : ""}</div>${rows}</div>`;
    const tg = (on, a) => `<button class="sw ${on ? "on" : ""}" ${a}></button>`;
    const up = (a, v, off) => `<button class="ib2" data-s="${a}|${v}" ${off ? "disabled" : ""}>${a.endsWith("up") ? "▲" : "▼"}</button>`;
    const tabs = !this._admin() ? [...(this._mgr() ? [["users", "Users", "add users, limit services and rooms"], ["updates", "Updates", "automatic updates and restart"]] : []), ["scenes", "Scenes", "add your own scenes"], ["rphoto", "Room photos", "pick a photo per room"], ["bg", "Background", "change it on this device"]] : [["general", "General", "title, background, layout"], ["pages", "Pages", "services, order, titles"], ["rooms", "Rooms", "floors, order and names"], ["rphoto", "Room photos", "background of each room"], ["devices", "Devices", "room and visibility per device"], ["rdev", "Room devices", "hide or show devices room by room"], ["srooms", "Service rooms", "hide unused rooms in each service"], ["home", "Home page", "clock, weather, services"], ["tiles", "Home tiles", "choose devices per tile"], ["wall", "Camera wall", "many cameras on one screen"], ["intercom", "Intercoms", "cameras, door, calls"], ["autos", "Automations", "choose what users can run"], ["users", "Users", "add users, limit services and rooms"], ["access", "Access", "default page and lock users"], ["updates", "Updates", "automatic updates and restart"], ["scenes", "Scenes", "add and edit scenes"], ["bg", "Background", "your own on this device"], ["cards", "Cards", "custom cards you added"]];
    const adm = this._admin();
    const tsSeg = (cur, attr, none) => `<div class="seg sm" style="flex-wrap:wrap">${Object.entries(TSIZES).map(([k, t]) => `<button class="${cur === k ? "on" : ""}" ${attr}="${attr === "data-s" ? "tsz|" : "tsd|"}${k}">${t.n}</button>`).join("")}${none ? `<button ${attr}="tsd|">Same as shared</button>` : ""}</div>`;
    let tab2 = tab;
    if (!adm) tab2 = tab === "bg" || tab === "rphoto" || ((tab === "users" || tab === "updates") && this._mgr()) ? tab : "scenes";
    tab = tab2;
    let body = "";
    if (tab === "bg") {
      const u = this._bgu(), b = { preset: "midnight", mode: "preset", dim: 0, blur: 0, ...(u || c.bg || {}) };
      let mine = ""; try { mine = localStorage.getItem("quint_ts") || ""; } catch (e) {}
      let mk = "", mt = ""; try { mk = localStorage.getItem("quint_ck") || ""; mt = localStorage.getItem("quint_ct") || ""; } catch (e) {}
      const ckSeg = `<div class="seg sm" style="flex-wrap:wrap">${[["digital", "Digital"], ["analog", "Analog"]].map(([k, n]) => `<button class="${this._clockStyle() === k ? "on" : ""}" data-sc="ckd|${k}">${n}</button>`).join("")}${mk ? '<button data-sc="ckd|">Same as shared</button>' : ""}</div>`;
      const ctSeg = `<div class="seg sm" style="flex-wrap:wrap">${[["1", "Show"], ["0", "Hide"]].map(([k, n]) => `<button class="${this._clockTile() === (k === "1") ? "on" : ""}" data-sc="ctd|${k}">${n}</button>`).join("")}${mt ? '<button data-sc="ctd|">Same as shared</button>' : ""}</div>`;
      body = sec("Clock", mk || mt ? "this device only" : "using the shared clock", row("Clock style", "digital numbers or an analog face", ckSeg) + row("Clock tile", "show the clock as a tile among the home tiles", ctSeg)) + sec("Tile size", mine && TSIZES[mine] ? "this device only" : "using the shared size", row("Size on this device", "extra large, large, small or very small tiles and cards", tsSeg(this._ts(), "data-sc", !!(mine && TSIZES[mine])))) +
        (adm ? "" : sec("Arrangement", "hold a tile or card for 2 seconds, then drag it onto the card whose place you want",
        row("Your own order", "tiles and cards are arranged on this device only", '<button class="sbtn" data-sc="ordreset|">Back to the shared order</button>'))) +
        sec("Background", u ? "this device only" : "using the shared look", `<div style="padding:4px 4px 12px">${this._pbControls(u, b)}</div>`);
    } else if (tab === "general") {
      const bg = { preset: "midnight", mode: "preset", dim: 0, blur: 0, ...(c.bg || {}) }, dv = localStorage.getItem("quint_dev") || "auto";
      body = sec("Settings file", "settings are stored on the server and shared by every user; a file makes them portable",
        row("Export", "download all settings as JSON", `<button class="sbtn" data-s="export|">Download</button>`) +
        row("Import", "an export; merged with what is already there", `<input type="file" accept=".json,application/json" data-import="1">`)) +
      sec("Tile size", "the size of every tile and card for all users; a person can pick another size on their own device",
        row("Size for everyone", "extra large, large, small or very small", tsSeg(TSIZES[c.tsz] ? c.tsz : "l", "data-s"))) +
      sec("Appearance", "",
        row("Client name", "written top left on every page", `<input type="text" data-ttl value="${E(c.title || "")}" placeholder="${E(this._title || "Quint")}">`) +
        row("Bottom text", "written next to the settings button, bottom right (empty = hide)", `<input type="text" data-cred value="${E(c.credit === undefined ? "By Quinteca" : c.credit)}" placeholder="By Quinteca">`) +
        row("Greeting name", "shown on the home page", `<input type="text" data-uname value="${E(c.name || "")}" placeholder="${E((this._h.user && this._h.user.name) || "")}">`)) +
      sec("Background", "everything sits on top of this",
        row("Theme", "colour themes", Object.keys(BG).map((k) => `<button class="swt ${bg.mode !== "image" && bg.preset === k ? "sel" : ""}" style="background:${SWATCH[k]}" title="${k}" data-s="bgp|${k}"></button>`).join("")) +
        row("Photo", "your own picture; jpg or png, shrunk to fit automatically", `<input type="file" accept="image/*" data-bgfile="1">${this._bgData ? `<button class="sbtn" data-s="bgm|">${bg.mode === "image" ? "In use" : "Use photo"}</button><button class="sbtn" data-s="bgx|">Remove</button>` : ""}`) +
        row("Darken", "easier to read text on a bright photo", `<input type="range" min="0" max="80" value="${+bg.dim || 0}" data-bg="dim">`) +
        row("Blur", "soften the background", `<input type="range" min="0" max="20" value="${+bg.blur || 0}" data-bg="blur">`)) +
      sec("This device", "saved on this device only",
        row("Screen layout", `Detected: ${this._auto || "–"} · ${this._w || 0}px wide`, `<select data-devsel="1">${[["auto", "Auto"], ["phone", "Phone"], ["tablet", "Tablet"], ["desktop", "Desktop / wall panel"]].map(([v, l]) => `<option value="${v}" ${dv === v ? "selected" : ""}>${l}</option>`).join("")}</select>`) +
        row("Fullscreen", "hide the Home Assistant sidebar", tg(localStorage.getItem("quint_full") === "1", 'data-tog="full:0"')));
    } else if (tab === "pages") {
      const all = this._svcsList(), H = c.svcHide || [], T = c.svcTitle || {};
      body = sec("Pages", "name, show and order the services on the home screen and bottom bar", all.map((k, i) => {
        const def = SV_DEF[k] || k.slice(3);
        return row(`${SV[k].i} ${E(def)}`, H.includes(k) ? "hidden" : "shown", `<input type="text" data-svct="${E(k)}" value="${E(T[k] || "")}" placeholder="${E(def)}">${tg(!H.includes(k), `data-s="svcvis|${E(k)}"`)}${up("svcup", E(k), i === 0)}${up("svcdn", E(k), i === all.length - 1)}`);
      }).join(""));
    } else if (tab === "rooms") {
      const FL = c.floors || [];
      body = sec("Floors", "group rooms by floor; the Rooms page shows one tab per floor",
        (FL.map((f, i) => row("Floor", "", `<input type="text" data-fname="${i}" value="${E(f.name)}">${up("fup", i, i === 0)}${up("fdn", i, i === FL.length - 1)}<button class="ib2" data-tog="fdel:${i}">✕</button>`)).join("") || '<div class="lbl" style="padding:6px 4px 12px">No floors yet: all rooms are in one list.</div>') +
        `<div class="btns"><button data-tog="fadd:0">＋ Add floor</button></div>`) +
        sec("Rooms", "which ones, their floor and in which order", c.rooms.map((r, i) => row(E(r.id), "", `<input type="text" data-rname="${i}" value="${E(r.name)}">${FL.length ? `<select data-rfl="${i}"><option value="">(no floor)</option>${FL.map((f) => `<option value="${E(f.id)}" ${r.floor === f.id ? "selected" : ""}>${E(f.name)}</option>`).join("")}</select>` : ""}${tg(r.on !== false, `data-tog="room:${i}"`)}${up("rup", i, i === 0)}${up("rdn", i, i === c.rooms.length - 1)}<button class="ib2" data-tog="del:${i}">✕</button>`)).join("") +
        `<div class="btns"><button data-tog="add:0">＋ Add room</button><button data-tog="import:0">Re-import from HA areas</button></div>`);
    } else if (tab === "rphoto") {
      const loc = this._rimgs();
      body = sec("Room photos", adm ? "shared by every user; the switch turns the photo on in that room's page" : "shown at the top of the room's page, saved on this device only",
        c.rooms.map((r, i) => { const im = loc[r.id] || (this._rsrv || {})[r.id] || ""; return row(E(r.name), "", `${im ? `<img class="rpv" src="${im}">` : ""}<input type="file" accept="image/*" data-rimg="${E(r.id)}" style="max-width:190px;color:var(--mu);font-size:12px">${im ? `<button class="ib2" data-rimgb="${E(r.id)}" title="Remove photo">✕</button>` : ""}${adm ? tg(!!r.pic, `data-tog="rpic:${i}"`) : ""}`); }).join("") || '<div class="lbl" style="padding:6px 4px 12px">No rooms yet.</div>');
    } else if (tab === "devices") {
      const q = (this._dflt || "").toLowerCase(), H = c.hide || [];
      const list = Object.keys(this._h.states).filter((i) => this._svcOf(i)).filter((i) => !q || i.includes(q) || this._nm(i).toLowerCase().includes(q));
      body = sec("Devices", `${Math.min(list.length, 500)} of ${list.length} shown`, row("Search", "filter by name or entity id", `<input type="text" data-dfilter value="${E(this._dflt || "")}" placeholder="light.kitchen">`) +
        list.slice(0, 500).map((id) => row(`${SV[this._svcOf(id)].i} ${E(this._nm(id))}`, E(id), `<select data-map="${E(id)}"><option value="">(no room)</option>${c.rooms.map((r) => `<option value="${E(r.id)}" ${this._roomOf(id) === r.id ? "selected" : ""}>${E(r.name)}</option>`).join("")}</select>${tg(!H.includes(id), `data-tog="hide:${E(id)}"`)}`)).join(""));
    } else if (tab === "srooms") {
      const sv = this._svcsAll().filter((k) => k !== "intercom" && k !== "automations" && k !== "camwall" && k !== "clock"), cur = sv.includes(this._sr) ? this._sr : sv[0], rs = (c.rooms || []).filter((r) => r.on !== false), HH = (c.roomHide || {})[cur] || [];
      const cnt = (r) => (isCs(cur) ? this._csItems(r.id, cur).length : this._ents(cur, r.id).length);
      body = !cur ? sec("Service rooms", "", '<div class="lbl" style="padding:6px 4px 12px">No services yet.</div>') :
        sec("Service", "choose a service, then switch off the rooms that do not use it. They disappear from that service's page",
          `<div class="seg" style="flex-wrap:wrap;margin:4px 4px 10px">${sv.map((k) => `<button class="${k === cur ? "on" : ""}" data-s="srsel|${E(k)}">${E(SV[k] ? SV[k].n : k)}</button>`).join("")}</div>`) +
        sec(E(SV[cur] ? SV[cur].n : cur), `${rs.length - rs.filter((r) => HH.includes(r.id)).length} of ${rs.length} rooms shown`,
          rs.map((r) => row(E(r.name), `${cnt(r)} ${cnt(r) === 1 ? "item" : "items"}`, tg(!HH.includes(r.id), `data-s="srt|${E(r.id)}"`))).join("") +
          `<div class="btns"><button data-s="srempty|">Hide rooms with nothing</button><button data-s="srall|">Show all rooms</button></div>`);
    } else if (tab === "rdev") {
      const rs = (c.rooms || []).filter((r) => r.on !== false), H = c.hide || [], cur = rs.find((r) => r.id === this._rd) || rs[0];
      if (!cur) body = sec("Room devices", "", '<div class="lbl" style="padding:6px 4px 12px">No rooms yet. Add rooms in Settings → Rooms.</div>');
      else {
        const all = Object.keys(this._h.states).filter((i) => this._svcOf(i)), inR = all.filter((i) => this._roomOf(i) === cur.id).sort((a, b) => this._nm(a).localeCompare(this._nm(b)));
        const free = all.filter((i) => !this._roomOf(i) || !rs.some((r) => r.id === this._roomOf(i))).sort((a, b) => this._nm(a).localeCompare(this._nm(b))).slice(0, 80);
        const shown = inR.filter((i) => !H.includes(i)).length;
        body = sec("Room", "choose a room, then switch its devices on (shown) or off (hidden for every user)",
          `<div class="seg" style="flex-wrap:wrap;margin:4px 4px 10px">${rs.map((r) => `<button class="${r.id === cur.id ? "on" : ""}" data-s="rdsel|${E(r.id)}">${E(r.name)}</button>`).join("")}</div>`) +
        sec(E(cur.name), `${shown} of ${inR.length} devices shown`,
          (inR.map((id) => row(`${SV[this._svcOf(id)].i} ${E(this._nm(id))}`, `${E(SV[this._svcOf(id)].n)} · ${E(id)}`, tg(!H.includes(id), `data-tog="hide:${E(id)}"`))).join("") || '<div class="lbl" style="padding:6px 4px 12px">No devices in this room yet.</div>') +
          (inR.length ? `<div class="btns"><button data-s="rdall|show">Show all</button><button data-s="rdall|hide">Hide all</button></div>` : "")) +
        (() => {
          const cc = (c.custom[cur.id] || []).map((it, i) => ({ it, i }));
          return cc.length ? sec("Cards in " + E(cur.name), "the cards you added. Show = visible to users. Room tile = also shown in the room page as its own tile",
            cc.map(({ it, i }) => { const st = it.entity && this._h.states[it.entity], nm = it.name || (st && st.attributes.friendly_name) || it.text || it.entity || "Card"; return row(E(nm), `${E(this._csKey(it) === "more" ? "More" : this._csKey(it).slice(3))} · ${E(it.type === "entity" ? it.entity : it.type)}`, `<span class="lbl" style="margin-right:6px">Show</span>${tg(!it.off, `data-cc="vis:${E(cur.id)}:${i}"`)}<span class="lbl" style="margin:0 6px 0 14px">Room tile</span>${tg(!!it.tile, `data-cc="pin:${E(cur.id)}:${i}"`)}`); }).join("")) : "";
        })() +
        (free.length ? sec("Not in any room", "add a device to " + E(cur.name),
          free.map((id) => row(`${SV[this._svcOf(id)].i} ${E(this._nm(id))}`, E(id), `<button class="sbtn" data-s="rdadd|${E(id)}">Add here</button>`)).join("")) : "");
      }
    } else if (tab === "home") {
      const all = this._svcsList(), H = c.svcHide || [];
      body = sec("Home screen", "what the home page shows",
        row("Clock", "the big clock on the left", tg(!c.noClock, 'data-s="flag|noClock"')) +
        row("Clock style", "digital numbers or an analog face, for the clock on the left and the clock tile", `<div class="seg sm">${[["digital", "Digital"], ["analog", "Analog"]].map(([k, n]) => `<button class="${(c.cks === "analog" ? "analog" : "digital") === k ? "on" : ""}" data-s="cks|${k}">${n}</button>`).join("")}</div>`) +
        row("Clock tile", "a clock as its own tile among the home tiles. Drag it like any other tile", tg(!!c.clockTile, 'data-s="ctile|"')) +
        row("Weather line", "temperature, condition and sunset", tg(!c.noWeather, 'data-s="flag|noWeather"')) +
        row("Scenes", "the scene buttons under the greeting", tg(!c.noScenes, 'data-s="flag|noScenes"')) +
        row("Rooms tab", "the page with the list of rooms", tg(!c.noRooms, 'data-s="flag|noRooms"'))) +
      sec("Services", "show or hide a tile on the home page and its tab in the bottom bar",
        all.map((k) => row(`${SV[k].i} ${E(SV[k].n)}`, H.includes(k) ? "hidden" : "shown", tg(!H.includes(k), `data-s="svcvis|${E(k)}"`))).join(""));
    } else if (tab === "tiles") {
      const keys = ["security", "cameras", "lights", "climate", "media", "shades"].filter((k) => this._ents(k).length);
      body = `<div class="lbl" style="margin:0 4px 14px">Choose which devices appear on each home tile. Every chosen camera becomes its own tile. Until you change a tile it stays automatic.</div>` +
        (keys.map((k) => {
          const all = this._ents(k).slice(0, 150), sel = new Set(this._tileIds(k)), explicit = Array.isArray((c.tiles || {})[k]);
          return sec(`${E(SV[k].n)} tile`, explicit ? `${sel.size} chosen` : "automatic",
            all.map((id) => { const r = this._rooms().find((x) => x.id === this._roomOf(id)); return row(E(this._nm(id)), `${E(r ? r.name + " · " : "")}${E(id)}`, tg(sel.has(id), `data-s="tile|${k}|${E(id)}"`)); }).join("") +
            (explicit ? `<div class="btns"><button data-s="tileauto|${k}">Back to automatic</button></div>` : ""));
        }).join("") || sec("Tiles", "", '<div class="lbl">No devices found yet.</div>'));
    } else if (tab === "wall") {
      const w = this._wallCfg(), all = this._wallAll(), chosen = w.ids.filter((i) => all.includes(i)), H = c.svcHide || [], shown = this._wallCams().length;
      const camRow = (id, on, pos) => row(E(this._nm(id)), E(id), `${on ? `<button class="ib2" data-s="wall|up|${E(id)}" ${pos === 0 ? "disabled" : ""}>▲</button><button class="ib2" data-s="wall|dn|${E(id)}" ${pos === chosen.length - 1 ? "disabled" : ""}>▼</button>` : ""}${tg(on, `data-s="wall|cam|${E(id)}"`)}`);
      body = sec("Camera wall", "one dedicated screen that shows many cameras at once",
        row("Cameras on the screen", "1 to 32. The tiles are laid out to fill the screen for this number", `<select data-wn="1">${Array.from({ length: 32 }, (_, i) => i + 1).map((n) => `<option value="${n}" ${n === w.n ? "selected" : ""}>${n}</option>`).join("")}</select>`) +
        row("Show in the bottom bar", "switch off to hide the page for everyone", tg(!H.includes("camwall"), 'data-s="svcvis|camwall"')) +
        row("Live video", "every camera plays live. Off = pictures that refresh as fast as the camera answers", tg(w.live, 'data-s="wall|live"')) +
        row("Most cameras live at once", "All is best. Choose a number if the screen or Home Assistant is too slow. The other cameras then show fast pictures", `<div class="seg sm" style="flex-wrap:wrap">${[[0, "All"], [4, "4"], [8, "8"], [12, "12"], [16, "16"]].map(([k, n]) => `<button class="${w.max === k ? "on" : ""}" data-s="wall|max|${k}">${n}</button>`).join("")}</div>`) +
        row("Camera names", "write the name on each tile", tg(w.names, 'data-s="wall|names"')) +
        row("Video player", "Smooth uses the Home Assistant player (WebRTC or HLS) for live video, and falls back by itself if a camera cannot do it. Applies to every camera", `<div class="seg">${[["auto", "Smooth"], ["std", "Standard"]].map(([k, n]) => `<button class="${(c.eng || "auto") === k ? "on" : ""}" data-s="eng|${k}">${n}</button>`).join("")}</div>`)) +
      sec("Cameras", `${chosen.length ? chosen.length + " chosen" : "automatic: the first " + w.n} · ${shown} on the screen`,
        (all.length ? chosen.map((id, i) => camRow(id, true, i)).join("") + all.filter((i) => !chosen.includes(i)).map((id) => camRow(id, false, -1)).join("") : '<div class="lbl" style="padding:6px 4px 12px">No cameras found in Home Assistant.</div>') +
        `<div class="lbl" style="padding:8px 4px 4px">Switch on the cameras you want, in the order you want. If none are chosen, the first cameras are shown automatically. Only as many as the number above are shown.</div>` +
        (chosen.length ? '<div class="btns"><button data-s="wall|auto">Back to automatic</button></div>' : ""));
    } else if (tab === "intercom") {
      const L = this._ics(), cams = Object.keys(this._h.states).filter((i) => i.startsWith("camera.")), ic = this._icCur();
      const pick = `<div class="seg sm" style="margin:0 0 14px">${L.map((x, i) => `<button class="${x === ic ? "on" : ""}" data-s="icsel|${i}">${E(this._icName(x))}</button>`).join("")}</div>`;
      const head = sec("Intercoms", "add one intercom for every door station; each gets its own tile on the home page", (L.length ? pick : '<div class="lbl" style="padding:6px 4px 12px">No intercom yet.</div>') + `<div class="btns"><button class="pri" data-s="icadd|">＋ Add intercom</button>${ic ? `<button data-s="icdel|">Delete “${E(this._icName(ic))}”</button>` : ""}</div>`);
      if (!ic) body = head;
      else {
        const txt = (p, ph) => { const [a, b] = p.split("."), v = b ? (ic[a] || {})[b] : ic[a]; return `<input type="text" data-icf="${p}" value="${E(v || "")}" placeholder="${E(ph)}" list="ic-ents">`; };
        const act = (k, t) => row("Action", t, txt(k + ".a", "button.open_door  /  lock.front_door  /  script.call_me")) + row("Target entity", "only if the action above is a service such as light.turn_on", txt(k + ".e", "optional")) + row("Data", "optional JSON for a service", txt(k + ".d", '{"brightness": 200}'));
        body = head + sec("Settings of " + E(this._icName(ic)), "",
          row("Name", "", txt("name", "Intercom")) +
          row("Camera", "the video of your door station", `<select data-icf="camera"><option value="">(none)</option>${cams.map((i) => `<option value="${E(i)}" ${ic.camera === i ? "selected" : ""}>${E(this._nm(i))}</option>`).join("")}</select>`) +
          row("Doorbell sensor", "optional: a binary_sensor or event that rings", txt("bell", "binary_sensor.doorbell")) +
          row("Open video on ring", "show the big camera by itself when the bell rings", tg(!!ic.auto, 'data-s="icflag|auto"'))) +
        sec("Buttons", "choose which buttons are shown on the tile, page and big camera",
          row("Video call", "opens the big camera", tg(!ic.noVideo, 'data-s="icflag|noVideo"')) +
          row("Audio call", "", tg(!ic.noAudio, 'data-s="icflag|noAudio"')) +
          row("Open door", "", tg(!ic.noDoor, 'data-s="icflag|noDoor"'))) +
        sec("Open door", "needs two taps to confirm. Use an entity (lock, switch, button, script…) or a service", act("door", "")) +
        sec("Audio call", "an entity or service that starts the call, or a link like sip:101@pbx or tel:+974…", act("audio", "")) +
        sec("Video call (optional)", "extra action when Video call is tapped; the big camera always opens", act("video", "")) +
        `<datalist id="ic-ents">${Object.keys(this._h.states).sort().map((i) => `<option value="${E(i)}">`).join("")}</datalist>`;
      }
    } else if (tab === "updates") {
      this._upLoad();
      const U = this._up, H = U && U.hacs, cfgOn = (k) => c[k] !== false, btn = (a, t, off, pri) => `<button class="${pri ? "pri" : ""}" data-um="upd|${a}" ${off || this._upBusy ? "disabled" : ""}>${t}</button>`;
      const avail = !!(H && H.state === "on"), pend = !!(U && U.pending);
      const line = !U ? "Loading…" : U.error ? "Could not read the update status." : pend ? `Version ${E(U.disk)} is installed. Home Assistant must restart to run it.` : avail ? `A new version ${E(H.latest || "")} is available.` : H ? "Quint is up to date." : "HACS was not found, so new versions cannot be installed automatically.";
      body = sec("Quint version", "", row("Running now", "", `<b>v${E(VER)}</b>`) +
        (U && U.disk && U.disk !== VER ? row("Installed on disk", "waiting for a restart", `<b>v${E(U.disk)}</b>`) : "") +
        (H && H.latest ? row("Latest in HACS", H.release_url ? `<a href="${E(H.release_url)}" target="_blank" rel="noopener" style="color:var(--ac)">release notes</a>` : "", `<b>v${E(String(H.latest).replace(/^v/, ""))}</b>`) : "") +
        `<div class="lbl" style="padding:8px 4px 4px">${line}</div>${this._upMsg ? `<div class="lbl" style="padding:2px 4px 8px;color:var(--ac)">${E(this._upMsg)}</div>` : ""}${U && U.last_error ? `<div class="lbl" style="padding:2px 4px 8px;color:var(--bad)">${E(U.last_error)}</div>` : ""}` +
        `<div class="btns">${btn("check", "Check now")}${btn("install", "Update now", !avail, avail)}${btn("restart", "Restart Home Assistant", false, pend)}</div>`) +
      sec("Automatic", "everything below happens by itself; switch a step off to keep control",
        row("Install new versions", "when HACS finds a new Quint release, install it without asking", tg(cfgOn("upInstall"), 'data-um="upflag|install"')) +
        row("Restart Home Assistant", "restart automatically after an update has been installed (about a minute later)", tg(cfgOn("upRestart"), 'data-um="upflag|restart"')) +
        row("Reload open screens", "always on: every open Quint screen reloads itself after the restart", '<b>On</b>')) +
      sec("How it works", "", '<div class="lbl" style="padding:6px 4px 12px">You publish the new version on GitHub (a release is created automatically when the version number changes). HACS notices it within about two hours; <b>Check now</b> asks HACS right away. Quint then installs it, restarts Home Assistant and every open screen reloads itself. The two switches are saved right away.</div>');
    } else if (tab === "access") {
      this._loadUsers();
      const U = this._normUsers(), sel = new Set(c.lockUsers || []);
      body = sec("Quint as the home of your users", "applies to normal (non-admin) users; admins are never affected",
        row("Open Quint first", "after signing in, normal users land on Quint instead of the default Home Assistant page", tg(!!c.dflt || !!c.lock, 'data-s="flag|dflt"')) +
        row("Lock to Quint", "hide the Home Assistant sidebar and send users back to Quint when they try to open any other page", tg(!!c.lock, 'data-s="flag|lock"'))) +
      sec("Who is locked", sel.size ? `${sel.size} chosen user${sel.size === 1 ? "" : "s"}` : "all normal users",
        (U.length ? U.map((x) => row(E(x.name), sel.size ? "" : "locked, because no one is chosen", tg(sel.has(x.id), `data-s="lockuser|${E(x.id)}"`))).join("") : `<div class="lbl" style="padding:6px 4px 12px">${this._usersBusy ? "Loading users…" : "No normal users found."}</div>`) +
        '<div class="lbl" style="padding:8px 4px 4px">Switch on specific users to lock only them. With none switched on, every normal user is locked.</div>') +
      sec("Good to know", "", '<div class="lbl" style="padding:6px 4px 12px">This hides and redirects the screens of Home Assistant for these users. It is not a security wall: for real limits keep their accounts non-admin. Pressing Close or Save here does not change what you (an admin) see.</div>');
    } else if (tab === "users") {
      this._loadUsers();
      const isA = this._admin(), U = (this._ua || []).filter((x) => isA || !x.is_admin), P = c.perms || {}, me = this._h.user && this._h.user.id, busy = !!this._ubusy, mg = c.manager || "";
      const um = (a, v) => `data-um="${a}|${v}"`;
      const sum = (id) => { const p = P[id]; if (!p) return "everything"; const a = (p.svcOff || []).length, b = (p.roomOff || []).length; return [a ? `${a} service${a === 1 ? "" : "s"} off` : "", b ? `${b} room${b === 1 ? "" : "s"} off` : ""].filter(Boolean).join(" · "); };
      const one = (x) => {
        const adm2 = !!x.is_admin, self = x.id === me, open = this._pu === x.id && !adm2 && !self;
        let h = row(E(x.name) + (adm2 ? " · Admin" : x.id === mg ? " · Quint admin" : ""), adm2 ? "full access" : self ? "you · you add users and set their limits" : `can use: ${sum(x.id)}`,
          adm2 || self ? "" : `<button class="sbtn" ${um("usel", E(x.id))}>${open ? "Close" : "Limits"}</button>${x.id === mg ? "" : `<button class="ib2" ${um("udel", E(x.id))} title="Remove user">✕</button>`}`);
        if (open) {
          const p = P[x.id] || {}, so = p.svcOff || [], ro = p.roomOff || [], rs = (c.rooms || []).filter((r) => r.on !== false), ks = [...this._svcsList(), "rooms"].filter((k, i, a) => a.indexOf(k) === i);
          h += `<div class="ulim">` +
            `<div class="lbl" style="padding:8px 4px 2px">Services ${E(x.name)} can use · switched off = hidden</div>` +
            ks.map((k) => row(E(k === "rooms" ? "Rooms page" : SV[k] ? SV[k].n : k), "", tg(!so.includes(k), um("usvc", E(x.id) + "|" + E(k))))).join("") +
            `<div class="lbl" style="padding:10px 4px 2px">Rooms ${E(x.name)} can see · switched off = hidden, with their devices</div>` +
            (rs.map((r) => row(E(r.name), "", tg(!ro.includes(r.id), um("urm", E(x.id) + "|" + E(r.id))))).join("") || '<div class="lbl" style="padding:6px 4px">No rooms yet.</div>') +
            (P[x.id] ? `<div class="btns"><button ${um("ureset", E(x.id))}>Give full access again</button></div>` : "") + `</div>`;
        }
        return h;
      };
      body = (isA ? sec("Quint admin", "one person you trust: a normal user who can also add users and limit their services and rooms",
        (this._normUsers().map((x) => row(E(x.name), x.id === mg ? "Quint admin" : "", tg(x.id === mg, um("mgr", E(x.id))))).join("") || `<div class="lbl" style="padding:6px 4px 12px">${this._usersBusy ? "Loading users…" : "Add a user below first."}</div>`) +
        '<div class="lbl" style="padding:8px 4px 4px">Only one person can be the Quint admin. Switch the person off again to have none. They can use everything the other users can, plus this Users tab. They cannot become a Home Assistant admin.</div>') : "") +
      sec("People", isA ? "admins can use everything; for the others choose what they may use" : "choose what each person may use. Changes are saved right away",
        (U.length ? U.map(one).join("") : `<div class="lbl" style="padding:6px 4px 12px">${this._usersBusy ? "Loading users…" : "No users found."}</div>`)) +
      sec("Add a user", "creates a normal Home Assistant account (not an admin)",
        row("Name", "shown on the home page", '<input type="text" data-nu="name" placeholder="Anna" autocomplete="off">') +
        row("Login name", "letters and numbers", '<input type="text" data-nu="user" placeholder="anna" autocomplete="off" autocapitalize="none">') +
        row("Password", "at least 8 characters", '<input type="password" data-nu="pass" autocomplete="new-password">') +
        `<div class="btns"><button class="pri" ${um("unew", "")} ${busy ? "disabled" : ""}>${busy ? "Adding…" : "＋ Add user"}</button></div>`) +
      sec("Good to know", "", '<div class="lbl" style="padding:6px 4px 12px">New users start with everything. Limits hide services, rooms and their devices inside Quint. It is not a security wall: a user could still open Home Assistant itself, so also switch on <b>Lock to Quint</b> in the Access tab (admin). Limits apply to normal users only.</div>');
    } else if (tab === "autos") {
      const all = Object.keys(this._h.states).filter((i) => /^(automation|script)\./.test(i)).sort((a, b) => this._nm(a).localeCompare(this._nm(b))).slice(0, 300), sel = new Set(c.autos || []);
      body = sec("Automations", `choose the automations and scripts that appear on the home page and in the Automations tab (${sel.size} chosen). Users can switch an automation on or off and run it with ▶`,
        (all.map((id) => row(E(this._nm(id)), E(id), tg(sel.has(id), `data-s="auto|${E(id)}"`))).join("") || '<div class="lbl" style="padding:6px 4px 12px">No automations or scripts found in Home Assistant.</div>') +
        (sel.size ? '<div class="btns"><button data-s="autoclear|">Clear all</button></div>' : ""));
    } else if (tab === "scenes") {
      const mine = this._myScenes().filter((x) => (adm || x.sc === "l") && this._sceneOk(x)), has = Object.keys(this._h.states).filter((i) => i.startsWith("scene.")).slice(0, 60), hid = c.hide || [];
      body = sec("Scenes", "set your devices the way you want, then add the scene here. It shows on the home page, and on the room's page if you choose a room. Update re-saves the current state",
        (mine.map((x) => row(E(x.name), `${(x.items || []).length} devices${x.room && this._rooms().find((r) => r.id === x.room) ? " · " + this._rooms().find((r) => r.id === x.room).name : ""} · ${x.sc === "s" ? "everyone" : "this device only"}`, `<button class="sbtn" data-sc="re|${E(x.sc + ":" + x.id)}">Update</button><button class="ib2" data-sc="del|${E(x.sc + ":" + x.id)}">✕</button>`)).join("") || '<div class="lbl" style="padding:6px 4px 12px">No scenes yet.</div>') +
        '<div class="btns"><button class="pri" data-sc="new|">＋ New scene</button></div>') +
        (has.length && adm ? sec("Home Assistant scenes", "choose which are shown on the home page", has.map((id) => row(E(this._nm(id)), E(id), tg(!hid.includes(id), `data-tog="hide:${E(id)}"`))).join("")) : "");
    } else {
      const items = Object.entries(c.custom).flatMap(([pl, arr]) => arr.map((it, i) => ({ pl, it, i })));
      body = sec("Cards", "custom cards you added", (items.map(({ pl, it, i }) => {
        const room = pl === "home" ? "Home page" : (c.rooms.find((r) => r.id === pl) || { name: pl }).name, k = this._csKey(it);
        const st = this._h.states[it.entity], nm = it.name || (it.type === "lovelace" ? (it.config && it.config.type) || "Lovelace card" : it.text) || (st && st.attributes.friendly_name) || it.entity;
        return row(E(nm), `${E(room)} · ${pl === "home" ? "My cards" : k === "more" ? "More" : E(k.slice(3))} · ${it.type}`, (pl === "home" ? "" : `<span class="lbl" style="margin-right:6px">Room tile</span>${tg(!!it.tile, `data-cc="pin:${pl}:${i}"`)}`) + `<button class="ib2" data-cc="del:${pl}:${i}">✕</button>`);
      }).join("") || '<div class="lbl" style="padding:6px 4px 12px">No custom cards yet.</div>') + `<div class="btns"><button class="pri" data-cc="open:home">＋ Add card (home page or a room)</button></div>`);
    }
    const tabsHtml = tabs.map(([id, t, sub]) => `<button class="sti ${tab === id ? "act" : ""}" data-go='${JSON.stringify({ p: "settings", tab: id })}'>${SET_I[id]}<span><b>${t}</b><small>${sub}</small></span></button>`).join("");
    return `${this._top(false)}<div class="sbar"><div><h1>Settings</h1><div class="sub">${adm ? `Stored on the server for every user · Quint v${VER} · ${this._rn || 0} screen updates` : "Saved on this device only"}</div></div><div class="sbtns">${adm ? `<button class="sbtn ${this._dirty ? "pri2" : ""}" data-s="save|">Save</button><button class="sbtn" data-s="reset|">Reset everything</button><button class="sbtn" data-out="1">Sign out</button><button class="sbtn" data-s="close|">Close</button>` : `<button class="sbtn" data-out="1">Sign out</button><button class="sbtn" data-go='{"p":"home"}'>Close</button>`}</div></div><div class="sg"><div class="snav">${tabsHtml}</div><div>${body}</div></div>`;
  }

  /* ---------- render ---------- */
  _draw(force) {
    if (!this._h || !this._loaded || this._mv || this._hold) return;
    this._applyTs(); this._syncSv(); this._titles();
    const ae = this.shadowRoot.activeElement;
    if (!force && (this._drag || (ae && ["INPUT", "SELECT"].includes(ae.tagName)))) return;
    if (this._v.p === "intercom" && !this._icOn()) this._v = { p: "home" };
    if (this._perm()) { const v = this._v; if ((["cameras", "security", "intercom", "automations", "camwall"].includes(v.p) && !this._svOk(v.p)) || (v.p === "rooms" && v.svc && !this._svOk(v.svc)) || (v.p === "room" && !this._svOk("rooms"))) this._v = { p: "home" }; }
    const c = this._c;
    this._track = new Set(Object.keys(this._h.states).filter((i) => this._svcOf(i) || i.startsWith("scene.") || i.startsWith("weather.") || i === "sun.sun"));
    Object.values(c.custom).flat().forEach((x) => x.entity && this._track.add(x.entity));
    this._ics().forEach((ic) => [ic.camera, ic.bell].forEach((i) => i && this._track.add(i)));
    (c.autos || []).forEach((i) => this._track.add(i));
    this._myScenes().forEach((x) => (x.items || []).forEach((y) => this._track.add(y.e)));
    this._seen = {}; this._track.forEach((i) => (this._seen[i] = this._h.states[i]));
    this._n = Object.keys(this._h.states).length;
    const ringer = this._icList().find((x) => this._ringing(x)), ring = !!ringer;
    if (ringer && (!this._ringPrev || this._ringPrev !== ringer.id) && ringer.auto && ringer.camera && !this._cam && this._h.states[ringer.camera]) this._cam = ringer.camera;
    this._ringPrev = ringer ? ringer.id : null;
    const p = this._v.p, V = this._v;
    if (this._cam && !(this._h.states[this._cam] && this._h.states[this._cam].attributes.entity_picture)) this._cam = null;
    this._roomBg = "";
    let body = p === "home" ? this._home() : p === "rooms" ? this._roomsPage() : p === "room" ? this._areaPage() : p === "cameras" ? this._list("cameras") : p === "security" ? this._list("security") : p === "intercom" ? this._icPage() : p === "automations" ? this._autoPage() : p === "camwall" ? this._wallPage() : this._settings();
    if (p !== "home" && p !== "room") body = `<div class="page${p === "camwall" ? " wallpage" : ""}">${body}</div>`;
    if ((this._roomBg || "") !== (this._rbgOn || "")) {
      this._rbgOn = this._roomBg || "";
      this._applyBg();
    }
    const tab = (cls, go, ico, t, col) => `<button class="t ${cls}" data-c="${col}" style="--c:${col}" ${go}>${ico}<span>${t}</span></button>`;
    const tabs = `<span class="tind" data-id="tind" data-ks="1"></span>` + tab(p === "home" ? "act" : "", `data-go='{"p":"home"}'`, HOME_I, "Home", "#e8c98f") +
      (c.noRooms || !this._rooms().length ? "" : tab(p === "room" ? "act" : "", `data-go='{"p":"room"}'`, ICONS.door, "Rooms", "#7dd3fc")) +
      this._svcs().map((s) => tab((p === "rooms" && V.svc === s) || p === s ? "act" : "", this._tileGo(s), SV[s].i, SV[s].n, SV[s].c)).join("");
    const cr = this._credit(), adm = this._admin();
    const sy = this.scrollTop;
    const vk = JSON.stringify(V), changed = this._vk !== vk;
    const html = `<div class="bgl"><i></i></div><div class="app"><main class="${changed ? "anim" : ""}">${body}</main><nav><div class="tabs2">${tabs}</div><div class="nr">${cr ? `<span class="cr">${cr}</span>` : ""}<button class="gb" data-pers="open" title="Background">${PALETTE_I}</button><button class="gb" data-go='{"p":"settings"}' title="Settings">${GEAR_I}</button></div></nav></div>${this._dialog()}${this._scDialog()}${this._persDialog()}${this._camView()}`;
    if (html === this._last) { Object.values(this._lvc || {}).forEach((e) => (e.hass = this._h)); return; }
    this._last = html; this._vk = vk;
    const tpl = document.createElement("template");
    tpl.innerHTML = html.replaceAll("@@T@@", this._time()).replaceAll("@@C@@", this._clockHtml());
    this._morph(this._root, tpl.content);
    this._rn = (this._rn || 0) + 1;
    this.scrollTop = changed ? 0 : sy;
    this._slide(); if (typeof requestAnimationFrame === "function") requestAnimationFrame(() => this._slide());
    this._mountLv(); this._mountHa(); this._tickClock();
  }
}
customElements.define("quint-panel", QuintDashboard);
console.info("%c QUINT %c panel v" + VER + " loaded", "background:#f5a623;color:#000", "");

/* Quint access guard – loaded on every Home Assistant page.
   When an admin turns it on in Quint → Settings → Access, normal users open Quint
   by default and, if "Lock" is on, cannot open other Home Assistant pages.
   This is a convenience lock of the screen (not a security boundary): use
   non-admin accounts for real restrictions. Admins are never affected. */
(() => {
  if (window.__quintGuard) return;
  window.__quintGuard = true;
  const PATH = "/quint";
  const inQuint = () => location.pathname === PATH || location.pathname.startsWith(PATH + "/");
  const ha = () => document.querySelector("home-assistant");
  const go = () => {
    history.replaceState(null, "", PATH);
    window.dispatchEvent(new CustomEvent("location-changed"));
  };
  const hideSidebar = () => {
    try {
      const main = ha() && ha().shadowRoot && ha().shadowRoot.querySelector("home-assistant-main");
      if (!main) return;
      main.dispatchEvent(new CustomEvent("hass-dock-sidebar", { detail: { dock: "always_hidden" } }));
      const root = main.shadowRoot;
      if (root && !root.getElementById("quint-lock-style")) {
        const st = document.createElement("style");
        st.id = "quint-lock-style";
        st.textContent = "ha-sidebar{display:none!important}";
        root.appendChild(st);
      }
    } catch (e) { /* ignore */ }
  };
  const applies = (cfg, user) => {
    if (!cfg || !user || user.is_admin) return false;
    const list = Array.isArray(cfg.lockUsers) ? cfg.lockUsers : [];
    return !list.length || list.includes(user.id);
  };
  let tries = 0;
  const boot = async () => {
    const h = ha() && ha().hass;
    if (!h || !h.user || !h.callApi) { if (++tries < 200) setTimeout(boot, 300); return; }
    if (h.user.is_admin) return;
    let cfg;
    try { cfg = await h.callApi("GET", "quint/config"); } catch (e) { return; }
    if (!applies(cfg, h.user)) return;
    if (cfg.lock) {
      if (!inQuint()) go();
      const check = () => { if (!inQuint()) go(); };
      window.addEventListener("location-changed", () => setTimeout(check, 0));
      window.addEventListener("popstate", () => setTimeout(check, 0));
      window.addEventListener("hass-toggle-menu", (e) => e.stopPropagation(), true);
      hideSidebar();
      setInterval(() => { check(); hideSidebar(); }, 1500);
    } else if (cfg.dflt) {
      let done = false;
      try { done = sessionStorage.getItem("quint_dflt") === "1"; sessionStorage.setItem("quint_dflt", "1"); } catch (e) { /* ignore */ }
      if (!done && !inQuint()) go();
    }
  };
  boot();
})();

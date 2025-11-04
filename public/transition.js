function enterPage() {
  const page = document.querySelector(".page");
  if (!page) return;
  // Reset exit state
  page.classList.remove("is-exiting");
  // Trigger enter animation
  requestAnimationFrame(() => page.classList.add("is-entered"));
}

document.addEventListener("DOMContentLoaded", enterPage);

window.addEventListener("pageshow", () => {
  enterPage();
});

// Animate OUT on internal link clicks, then navigate.
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href") || "";
  const sameOrigin = link.origin === location.origin;
  const isHash = href.startsWith("#");
  const isDownload = link.hasAttribute("download") || link.target === "_blank";

  // Ignore external, hash, download, or empty links
  if (!sameOrigin || isHash || isDownload || href === "" ) return;

  // If link points to current page (including root-relative), ignore
  const targetUrl = new URL(link.href);
  if (targetUrl.pathname === location.pathname && targetUrl.search === location.search) return;

  // Exit animation
  const page = document.querySelector(".page");
  if (!page) return;

  e.preventDefault();
  page.classList.remove("is-entered");
  page.classList.add("is-exiting");

  const navigate = () => { window.location.assign(link.href); };

  // If the element actually transitions, wait for it
  let handled = false;
  const onEnd = () => { if (!handled) { handled = true; navigate(); } };
  page.addEventListener("transitionend", onEnd, { once: true });

  // Safety fallback
  setTimeout(onEnd, 400);
});

// switcher: 'auto' | 'dark' | 'light'
(() => {
  const STORAGE_KEY = "theme-preference";
  const btn = document.getElementById("theme-toggle");

  // Read saved pref; default to 'auto'
  function getPref() {
    return localStorage.getItem(STORAGE_KEY) || "auto";
  }

  // Apply theme to <html>
  function apply(theme) {
    const html = document.documentElement;
    if (theme === "auto") {
      html.removeAttribute("data-theme"); // system drives via @media
    } else {
      html.setAttribute("data-theme", theme); // force dark/light
    }
    localStorage.setItem(STORAGE_KEY, theme);
    updateButton(theme);
  }

  // theme button icon 
  function updateButton(theme) {
    if (!btn) return;
    if (theme === "auto") {
      btn.textContent = "🖥️";      // following system
      btn.title = "Theme: Auto (system)";
      btn.setAttribute("aria-label", "Theme: Auto (system)");
    } else if (theme === "dark") {
      btn.textContent = "🌙";
      btn.title = "Theme: Dark";
      btn.setAttribute("aria-label", "Theme: Dark");
    } else {
      btn.textContent = "☀️";
      btn.title = "Theme: Light";
      btn.setAttribute("aria-label", "Theme: Light");
    }
  }

  // auto → dark → light → auto
  function next(theme) {
    return theme === "auto" ? "dark" : theme === "dark" ? "light" : "auto";
  }

  // Init on load
  document.addEventListener("DOMContentLoaded", () => {
    const pref = getPref();
    apply(pref);
    if (btn) {
      btn.addEventListener("click", () => apply(next(getPref())));
    }
  });

})();


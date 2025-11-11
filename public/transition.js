function enterPage() {
  const page = document.querySelector(".page");
  if (!page) return;
  page.classList.remove("is-exiting");
  // Trigger enter animation on next frame
  requestAnimationFrame(() => page.classList.add("is-entered"));
}

document.addEventListener("DOMContentLoaded", enterPage);

// Handle bfcache restores (Back/Forward)
window.addEventListener("pageshow", () => {
  enterPage();
});

// Animate OUT on internal link clicks, then navigate.
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  // Respect new-tab / modifier keys / middle-click
  if (e.defaultPrevented) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (e.button !== 0) return; // only left click

  // Allow per-link opt-out
  if (link.dataset.noTransition === "true") return;

  const href = link.getAttribute("href") || "";
  const sameOrigin = link.origin === location.origin;
  const isHash = href.startsWith("#");
  const isDownload = link.hasAttribute("download") || link.target === "_blank";

  // Ignore external, hash, download, or empty links
  if (!sameOrigin || isHash || isDownload || href === "") return;

  // If link points to current page (including root-relative), ignore
  const targetUrl = new URL(link.href);
  if (targetUrl.pathname === location.pathname && targetUrl.search === location.search) return;

  const page = document.querySelector(".page");
  if (!page) return;

  e.preventDefault();
  page.classList.remove("is-entered");
  page.classList.add("is-exiting");

  const navigate = () => { window.location.assign(link.href); };

  // If transition fires, wait for it; otherwise fallback
  let handled = false;
  const onEnd = () => { if (!handled) { handled = true; navigate(); } };
  page.addEventListener("transitionend", onEnd, { once: true });

  // Fallback must be ≥ your CSS duration (300ms). Using 400ms for safety.
  setTimeout(onEnd, 400);
});

/* =========================
   Theme switcher: auto/dark/light
   ========================= */
(() => {
  const STORAGE_KEY = "theme-preference";
  let btn; // will set on DOMContentLoaded

  const getPref = () => localStorage.getItem(STORAGE_KEY) || "auto";

  const updateButton = (theme) => {
    if (!btn) return;
    if (theme === "auto") {
      btn.textContent = "🖥️";
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
  };

  const apply = (theme) => {
    const html = document.documentElement;
    if (theme === "auto") {
      html.removeAttribute("data-theme"); // system decides via @media
    } else {
      html.setAttribute("data-theme", theme); // force dark/light
    }
    localStorage.setItem(STORAGE_KEY, theme);
    updateButton(theme);
  };

  const next = (theme) => (theme === "auto" ? "dark" : theme === "dark" ? "light" : "auto");

  document.addEventListener("DOMContentLoaded", () => {
    btn = document.getElementById("theme-toggle");
    // Apply saved preference on load
    apply(getPref());
    // Cycle: auto → dark → light → auto
    btn?.addEventListener("click", () => apply(next(getPref())));
  });
})();

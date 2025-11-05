console.log("✅ StockY script.js loaded");

// =======================
// Highlight Current Page
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  document.querySelectorAll(".category-bar a").forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("is-active");
    } else {
      link.classList.remove("is-active");
    }
  });

  // Smooth page transition animation
  document.querySelector(".page")?.classList.add("is-entered");
});

// =======================
// Theme Toggle
// =======================
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  // Restore theme from localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
    localStorage.setItem("theme", newTheme);
  });
}

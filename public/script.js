console.log("✅ StockY script.js loaded");




document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  document.querySelectorAll(".category-bar a").forEach(link => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      link.classList.add("is-active");
    } else {
      link.classList.remove("is-active");
    }
  });
});

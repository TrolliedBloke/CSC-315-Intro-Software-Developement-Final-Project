// checkout.js
console.log("✅ checkout.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const form      = document.getElementById("checkoutForm");
  const shipRadios= document.querySelectorAll('input[name="ship"]');
  const promo     = document.getElementById("promo");

  const tSub   = document.getElementById("tSub");
  const tShip  = document.getElementById("tShip");
  const tDisc  = document.getElementById("tDisc");
  const tTotal = document.getElementById("tTotal");
  const list   = document.getElementById("summaryItems");

  let cart = [];
  let subtotal = 0;
  let shipping = 0;
  let discount = 0;

  const fmt = (n) => `$${Number(n).toFixed(2)}`;

  // ============= Load cart from localStorage =============
  try {
    const raw = localStorage.getItem("cart");
    const parsed = raw ? JSON.parse(raw) : [];
    cart = Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to read cart from localStorage", err);
    cart = [];
  }

  // ============= Render cart items in the sidebar =========
  function renderCart() {
    list.innerHTML = "";

    if (!cart.length) {
      const li = document.createElement("li");
      li.className = "summary-item";
      li.innerHTML = `
        <div class="meta">
          <div class="title">Your cart is empty.</div>
          <div class="muted">Go back and select a product & size.</div>
        </div>
      `;
      list.appendChild(li);
      subtotal = 0;
      recalc();
      return;
    }

    subtotal = 0;

    cart.forEach((item) => {
      const li = document.createElement("li");
      li.className = "summary-item";

      const qty = item.qty ?? 1;
      subtotal += (Number(item.price) || 0) * qty;

      li.innerHTML = `
        <div class="thumbbox">${(item.brand || item.id || "Item").substring(0, 6)}</div>
        <div class="meta">
          <div class="title">${item.title || "Product"}</div>
          <div class="muted">
            ${item.brand ? item.brand + " • " : ""}Size ${item.size || "—"} • Qty ${qty}
          </div>
        </div>
        <div class="price">${fmt(item.price || 0)}</div>
      `;

      list.appendChild(li);
    });

    recalc();
  }

  // ============= Totals / promo / shipping =============
  function recalc() {
    if (tSub)   tSub.textContent   = fmt(subtotal);
    if (tShip)  tShip.textContent  = fmt(shipping);
    if (tDisc)  tDisc.textContent  = `-${fmt(Math.abs(discount)).slice(1)}`;
    if (tTotal) tTotal.textContent = fmt(Math.max(0, subtotal + shipping - discount));
  }

  shipRadios.forEach(r => {
    r.addEventListener("change", () => {
      shipping = r.value === "express" ? 15 : 0;
      recalc();
    });
  });

  promo?.addEventListener("change", () => {
    const code = promo.value.trim().toUpperCase();
    if (code === "SUMMER10") {
      discount = Math.min(10, subtotal * 0.1); // 10% up to $10
    } else {
      discount = 0;
    }
    recalc();
  });

  // Initial render
  renderCart();

  // ============= Form submit =============
  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!cart.length) {
      alert("Your cart is empty. Please select a product and size first.");
      return;
    }

    const required = form.querySelectorAll("[required]");
    for (const el of required) {
      if (!el.value.trim()) {
        el.focus();
        alert("Please complete all required fields.");
        return;
      }
    }

    // Demo only: clear cart + go to confirmation page
    try {
      localStorage.removeItem("cart");
    } catch (err) {
      console.warn("Could not clear cart", err);
    }

    window.location.href = "/confirmation.html";
  });
});

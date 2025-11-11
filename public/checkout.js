// checkout.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkoutForm");
  const shipRadios = document.querySelectorAll('input[name="ship"]');
  const promo = document.getElementById("promo");
  const tSub = document.getElementById("tSub");
  const tShip = document.getElementById("tShip");
  const tDisc = document.getElementById("tDisc");
  const tTotal = document.getElementById("tTotal");
  const summary = document.getElementById("summaryItems");

  // ---- Load cart from localStorage ----
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!Array.isArray(cart)) cart = [];
  } catch {
    cart = [];
  }

  // If no cart item, bounce back to product
  if (cart.length === 0) {
    // Optional: show a toast instead of redirect
    window.location.replace("/product.html");
    return;
  }

  // Render summary items (supports multiple later; now single item)
  function renderSummary() {
    summary.innerHTML = "";
    for (const item of cart) {
      const li = document.createElement("li");
      li.className = "summary-item";
      li.innerHTML = `
        <div class="thumbbox"><img src="${item.thumb}" alt="${item.title}" style="width:40px;height:40px;object-fit:cover;border-radius:.4rem" /></div>
        <div class="meta">
          <div class="title">${item.title}</div>
          <div class="muted">Size ${item.size} • Qty ${item.qty || 1}</div>
        </div>
        <div class="price">$${Number(item.price).toFixed(2)}</div>
      `;
      summary.appendChild(li);
    }
  }

  // ---- Totals logic ----
  function cartSubtotal() {
    return cart.reduce((acc, it) => acc + Number(it.price) * (Number(it.qty) || 1), 0);
  }

  let shipping = 0;
  let discount = 0;

  const fmt = (n) => `$${n.toFixed(2)}`;

  function recalc() {
    const subtotal = cartSubtotal();
    tSub.textContent = fmt(subtotal);
    tShip.textContent = fmt(shipping);
    tDisc.textContent = `-${fmt(Math.abs(discount)).slice(1)}`;
    tTotal.textContent = fmt(Math.max(0, subtotal + shipping - discount));
  }

  // Initial paint
  renderSummary();
  recalc();

  // Shipping
  shipRadios.forEach(r =>
    r.addEventListener("change", () => {
      shipping = r.value === "express" ? 15 : 0;
      recalc();
    })
  );

  // Promo
  promo?.addEventListener("change", () => {
    const code = promo.value.trim().toUpperCase();
    const subtotal = cartSubtotal();
    // Simple sample codes
    if (code === "SUMMER10") {
      discount = Math.min(10, subtotal * 0.10);
    } else if (code === "FREESHIP") {
      discount = 0;
      shipping = 0;
      // Also visually reflect free ship
      document.querySelector('input[name="ship"][value="standard"]').checked = true;
    } else {
      discount = 0;
    }
    recalc();
  });

  // Submit (demo only)
  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    // Minimal validation
    const required = form.querySelectorAll("[required]");
    for (const el of required) {
      if (!el.value || !el.value.trim()) {
        el.focus();
        alert("Please complete all required fields.");
        return;
      }
    }

    // Persist final order (demo)
    const order = {
      items: cart,
      shipping: shipping,
      discount: discount,
      subtotal: cartSubtotal(),
      total: Math.max(0, cartSubtotal() + shipping - discount),
      placedAt: new Date().toISOString()
    };
    localStorage.setItem("lastOrder", JSON.stringify(order));

    // Navigate to confirmation
    window.location.href = "/confirmation.html";
  });
});

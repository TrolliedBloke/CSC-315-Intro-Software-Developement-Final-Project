// Product rendering utilities
// Helper functions to render products in grids and cards

/**
 * Render a product card
 * @param {Object} product - Product object
 * @returns {HTMLElement} Product card element
 */
function renderProductCard(product) {
  const card = document.createElement('a');
  card.href = `/product.html?id=${product.id}`;
  card.className = 'card card--product';
  
  const minPrice = product.sizes && product.sizes.length > 0
    ? Math.min(...product.sizes.map(s => s.price))
    : null;
  
  card.innerHTML = `
    <div class="card__img">
      <img src="${product.hero || '/assets/placeholder-shoe.png'}" alt="${product.title}" />
    </div>
    <div class="card__body">
      <h3 class="card__title">${product.title}</h3>
      <p class="card__meta">${product.brand}${minPrice ? ' • From $' + minPrice.toFixed(0) : ''}</p>
    </div>
  `;
  
  return card;
}

/**
 * Render products into a grid container
 * @param {Array} products - Array of product objects
 * @param {HTMLElement} container - Container element to render into
 */
function renderProductGrid(products, container) {
  if (!container) {
    console.error('Container element not found');
    return;
  }
  
  container.innerHTML = '';
  
  if (products.length === 0) {
    container.innerHTML = '<p class="helper-text">No products found.</p>';
    return;
  }
  
  products.forEach(product => {
    const card = renderProductCard(product);
    container.appendChild(card);
  });
}

/**
 * Render products by brand
 * @param {string} brand - Brand name
 * @param {HTMLElement} container - Container element
 */
async function renderProductsByBrand(brand, container) {
  if (!window.ProductAPI) {
    console.error('ProductAPI not loaded');
    return;
  }
  
  try {
    const products = await window.ProductAPI.fetchProductsByBrand(brand);
    renderProductGrid(products, container);
  } catch (error) {
    console.error('Error rendering products by brand:', error);
    if (container) {
      container.innerHTML = '<p class="helper-text">Error loading products.</p>';
    }
  }
}

// Export functions
window.ProductRenderer = {
  renderProductCard,
  renderProductGrid,
  renderProductsByBrand
};


// API Client for fetching products from the backend
// Falls back to static products.js if API is unavailable

const API_BASE = '/api/products';

// Cache for products
let productsCache = null;
let staticProductsLoaded = false;

/**
 * Fetch all products from the API
 * @param {Object} options - Query options (brand, limit)
 * @returns {Promise<Array>} Array of products
 */
async function fetchProducts(options = {}) {
  try {
    const params = new URLSearchParams();
    if (options.brand) params.append('brand', options.brand);
    if (options.limit) params.append('limit', options.limit);
    
    const url = `${API_BASE}${params.toString() ? '?' + params.toString() : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const products = await response.json();
    
    // Cache products for offline fallback
    if (!options.brand && !options.limit) {
      productsCache = products;
    }
    
    return products;
  } catch (error) {
    console.error('Error fetching products from API, trying static fallback:', error);
    
    // Fallback to cached products if available
    if (productsCache) {
      console.warn('Using cached products due to API error');
      return productsCache;
    }
    
    // Fallback to static products.js
    if (typeof window.PRODUCTS !== 'undefined') {
      console.log('Using static products.js as fallback');
      return Object.values(window.PRODUCTS);
    }
    
    // Last resort: return empty array
    return [];
  }
}

/**
 * Fetch a single product by ID
 * @param {string} productId - Product ID
 * @returns {Promise<Object|null>} Product object or null if not found
 */
async function fetchProduct(productId) {
  try {
    const response = await fetch(`${API_BASE}/${productId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        // Try fallback to static products
        return getProductFromStatic(productId);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching product from API, trying static fallback:', error);
    // Fallback to static products.js
    return getProductFromStatic(productId);
  }
}

/**
 * Get product from static products.js (fallback)
 * @param {string} productId - Product ID
 * @returns {Object|null} Product object or null
 */
function getProductFromStatic(productId) {
  // Check if static products are available
  if (typeof window.PRODUCTS !== 'undefined' && window.PRODUCTS[productId]) {
    console.log('Using static product data as fallback');
    return window.PRODUCTS[productId];
  }
  return null;
}

/**
 * Fetch products by brand
 * @param {string} brand - Brand name
 * @returns {Promise<Array>} Array of products
 */
async function fetchProductsByBrand(brand) {
  try {
    const response = await fetch(`${API_BASE}/brand/${encodeURIComponent(brand)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products by brand:', error);
    return [];
  }
}

// Export functions for use in other scripts
window.ProductAPI = {
  fetchProducts,
  fetchProduct,
  fetchProductsByBrand
};


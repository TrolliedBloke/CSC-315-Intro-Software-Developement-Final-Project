// API Client for fetching products from the backend
// This replaces the static products.js file

const API_BASE = '/api/products';

// Cache for products
let productsCache = null;

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
    console.error('Error fetching products:', error);
    
    // Fallback to cached products if available
    if (productsCache) {
      console.warn('Using cached products due to API error');
      return productsCache;
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
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
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


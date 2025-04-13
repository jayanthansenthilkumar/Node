const axios = require('axios');

const API_URL = 'https://fakestoreapi.com';
const cache = {
  allProducts: null,
  productById: {}
};

/**
 * Fetch all products with caching
 */
async function fetchProducts() {
  try {
    if (cache.allProducts) {
      console.log('Using cached products');
      return cache.allProducts;
    }
    
    const response = await axios.get(`${API_URL}/products`);
    cache.allProducts = response.data;
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Fetch a single product by ID with caching
 */
async function fetchProductById(id) {
  try {
    const cacheKey = `product_${id}`;
    if (cache.productById[cacheKey]) {
      console.log(`Using cached product ${id}`);
      return cache.productById[cacheKey];
    }
    
    const response = await axios.get(`${API_URL}/products/${id}`);
    cache.productById[cacheKey] = response.data;
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

module.exports = {
  fetchProducts,
  fetchProductById,
  API_URL
};

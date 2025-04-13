// Import necessary libraries
const express = require('express');
const axios = require('axios');

// Setup Express app
const app = express();
const PORT = 3012;

// API endpoint we're using
const API_URL = 'https://fakestoreapi.com/products';

// Store product data so we don't need to fetch it every time
let productData = null;

// Home page route
app.get('/', (req, res) => {
  res.send("Hello!, This is Jayanthan Senthilkumar");
});

// Products route
app.get('/products', async (req, res) => {
  try {
    // Use stored data if we have it, otherwise fetch from API
    if (!productData) {
      const response = await axios.get(API_URL);
      productData = response.data;
      console.log("Fetched fresh data from API");
    } else {
      console.log("Using cached data");
    }
    
    // Send product data to client
    res.json(productData);
  } catch (error) {
    // Handle any errors
    console.error("Error:", error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

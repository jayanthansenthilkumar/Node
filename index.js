const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3012;
const API_URL = 'https://fakestoreapi.com/products';

// Simple in-memory cache
const cache = {};

app.get('/', (req, res) => res.send("Hello!, This is Jayanthan Senthilkumar"));

app.get('/products', async (req, res) => {
  try {
    cache.all = cache.all || (await axios.get(API_URL)).data;
    res.json(cache.all);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

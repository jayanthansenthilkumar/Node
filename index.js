const express = require('express');
const axios = require('axios');
const PORT = 3012;
const app = express();

// Simple in-memory cache
const cache = {};

app.get('/',(req, res) => {
    res.send("Hello!, This is Jayanthan Senthilkumar");
});

async function fetchProducts() {
    const API_URL = 'https://fakestoreapi.com';
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

app.get('/products', async (req, res) => {
    try {
        const products = await fetchProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (cache[`product_${id}`]) {
            return res.json(cache[`product_${id}`]);
        }
        
        const API_URL = 'https://fakestoreapi.com';
        const response = await axios.get(`${API_URL}/products/${id}`);
        const product = response.data;
        cache[`product_${id}`] = product;
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// Use the router from products.js
app.use('/products', require('./products'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

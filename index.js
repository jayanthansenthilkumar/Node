const express = require('express');
const app = express();
const axios = require('axios');
const PORT = 3012;

app.get('/',(req, res) => {
    res.send("Hello!, This is Jayanthan Senthilkumar");
});

// Simplified API fetching function with optional ID parameter
async function fetchProducts(id = null) {
    const API_URL = 'https://fakestoreapi.com/products';
    const URL = id ? `${API_URL}/${id}` : API_URL;
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error(`Error fetching products${id ? ' with ID ' + id : ''}:`, error);
        throw error;
    }
}

// Cache for product data
const cache = {};

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
        if (id in cache) {
            return res.json(cache[id]);
        }
        const product = await fetchProducts(id);
        cache[id] = product;
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
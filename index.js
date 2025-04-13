const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3012;
const API_BASE = 'https://fakestoreapi.com/products';

app.get('/',(req, res) => {
    res.send("Hello!, This is Jayanthan Senthilkumar");
});

// Simple fetch function with minimal error handling
async function fetchData(url) {
    try {
        return (await axios.get(url)).data;
    } catch (error) {
        console.error('API error:', error.message);
        throw error;
    }
}

// Simple cache object
const cache = {};

app.get('/products', async (req, res) => {
    try {
        const products = await fetchData(API_BASE);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (cache[id]) {
            return res.json(cache[id]);
        }
        const product = await fetchData(`${API_BASE}/${id}`);
        cache[id] = product;
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
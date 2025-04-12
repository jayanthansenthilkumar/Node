const express = require('express');
const app = express();
const axios = require('axios');

app.get('/',(req, res) => {
res.send("Hello!, This is Jayanthan Senthilkumar");
});

async function fetchProducts() {
    const API_URL = 'https://fakestoreapi.com';
    try {
        const response = await axios.get(`${API_URL}/products`);
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
        console.log(req.params.id);
        const products = await fetchProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.listen(3012, () => {
    console.log(`Server is running on http://localhost:3012`);
});
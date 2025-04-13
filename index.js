const express = require('express');
const app = express();
const axios = require('axios');
const PORT = 3012;

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

const cacheV1 = {};
async function getProductsWithId(id) {
    if(id in cacheV1) {
        return cacheV1[id];
    }
    const API_DOMAIN = 'https://fakestoreapi.com/';
    const response = axios.get(API_DOMAIN + 'products/' + id);
    const data = (await response).data;
    cacheV1[id] = data;
    return data;
}

const cacheV2 = {};
async function getProductsWithIdV2(id) {
    if(id in cacheV2) {
        return cacheV2[id].then(r => r.data);
    }
    const API_DOMAIN = 'https://fakestoreapi.com/';
    const response = axios.get(API_DOMAIN + 'products/' + id);
    cacheV2[id] = response;
    const data = (await response).data;
    return data;
}

app.get('/v1/products/:id', async(req, res) => {
    const products = await getProductsWithId(req.params.id);
    res.send(products);
});

app.get('/v2/products/:id', async(req, res) => {
    const products = await getProductsWithIdV2(req.params.id);
    res.send(products);
});

// Use the router from products.js
app.use('/products', require('./products'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
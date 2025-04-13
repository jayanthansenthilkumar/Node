const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3012;

app.get('/', (req, res) => {
  res.send({message: 'Hello World'});
});

// V1 caching approach (store final data)
const cacheV1 = {};
async function getProductsWithId(id) {
  if(id in cacheV1) {
    console.log(`Using V1 cache for product ${id}`);
    return cacheV1[id];
  }
  const API_DOMAIN = 'https://fakestoreapi.com/';
  const response = await axios.get(API_DOMAIN + 'products/' + id);
  const data = response.data;
  cacheV1[id] = data;
  return data;
}

// V2 caching approach (store promise)
const cacheV2 = {};
async function getProductsWithIdV2(id) {
  if(id in cacheV2) {
    console.log(`Using V2 cache for product ${id}`);
    return cacheV2[id].then(r => r.data);
  }
  const API_DOMAIN = 'https://fakestoreapi.com/';
  const response = axios.get(API_DOMAIN + 'products/' + id);
  cacheV2[id] = response;
  return response.then(r => r.data);
}

app.get('/products', async(req, res) => {
  try {
    const API_DOMAIN = 'https://fakestoreapi.com/';
    const response = await axios.get(API_DOMAIN + 'products');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/v1/products/:id', async(req, res) => {
  try {
    const product = await getProductsWithId(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.get('/v2/products/:id', async(req, res) => {
  try {
    const product = await getProductsWithIdV2(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running in PORT:${PORT}`);
});
const express = require('express');
const app = express();
const { fetchProducts, fetchProductById } = require('./utils');

app.get('/',(req, res) => {
  res.send("Hello!, This is Jayanthan Senthilkumar");
});

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
    const product = await fetchProductById(id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.listen(3012, () => {
  console.log(`Server is running on http://localhost:3012`);
});
const express = require('express');
const PORT = 3012;
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

// Add the router at the end to avoid route conflicts
const productsRouter = require('./products');
app.use('/api/products', productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

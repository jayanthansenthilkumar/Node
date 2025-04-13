const express = require('express');
const axios = require('axios')
const app = express();
app.get('/', (req, res) => {
    console.log(req);
    res.send({message: 'Hello World'});
  });

  async function getProducts () {
    const API_DOMAIN = 'https://fakestoreapi.com/';
    const response = axios.get(API_DOMAIN + 'products')
    return (await response).data;
  }
app.get('/products', async(req, res) => {
    const products = await getProducts();
    res.send(products);
})
    app.use('/products', require('./products'));
const cacheV2 = {};
async function getProductsWithIdV2 (id) {
    if(id in cacheV2) {
        return cacheV2[id].then(r => r.data);
    }
    const API_DOMAIN = 'https://fakestoreapi.com/';
    const response = axios.get(API_DOMAIN + 'products/' + id);
    cacheV2[id] = response;
    const data = (await response).data
    return data;
  } 

const cacheV1 = {};
  async function getProductsWithId (id) {
    if(id in cacheV1) {
        return cacheV1[id];
    }
    const API_DOMAIN = 'https://fakestoreapi.com/';
    const response = axios.get(API_DOMAIN + 'products/' + id);
    const data = (await response).data
    cacheV1[id]= data;
    return data;
  } 

app.get('/v1/products/:id', async(req, res) => {
    const products = await getProductsWithId(req.params.id);
    res.send(products);
});

app.get('/v2/products/:id', async(req, res) => {
    const products = await getProductsWithIdV2(req.params.id);
    res.send(products);
})
app.listen(3012, () => {
    console.log(`Server is running in PORT:${PORT}`);
})
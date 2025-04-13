const express = require('express');
const router = express.Router();

router.get('/products', async (req, res) => {
    res.send({message: 'Your Products'});
});
router.get('/name', async (req, res) => {
    res.send({message: 'Name not found'});
});
module.exports = router;
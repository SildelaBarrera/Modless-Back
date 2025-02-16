const express = require('express');
const { getProducts, getProductById } = require('../controller/product.controller');

const router = express.Router();

router.get('/products', getProducts); 
router.get('/products/:id_product', getProductById); 

module.exports = router;
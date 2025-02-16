const express = require('express');
const { getProducts, getProductById, getProductsByCategory } = require('../controller/product.controller');

const router = express.Router();

router.get('/products', getProducts); 
router.get('/products/:id_product', getProductById); 
// router.get('/products/:category', getProductsByCategory)

module.exports = router;
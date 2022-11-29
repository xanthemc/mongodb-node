const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product_controller.js');
const CartController = require('../controllers/cart_controller.js');


//Products
router.get('/product', ProductController.getProduct);
router.get('/product/:id', ProductController.getSingleProduct);
router.post('/product/name', ProductController.getProductByName);
router.post('/product', ProductController.createProduct);
router.put('/product/:id', ProductController.updateProduct);
router.delete('/product/:id', ProductController.deleteProduct);

//Cart
router.get('/cart', CartController.getCart);
router.post('/cart', CartController.createCart);
router.put('/cart/:id', CartController.updateCart);
router.delete('/cart/:id', CartController.deleteCart);
module.exports = router;


const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee_controller.js');
const BlogController = require('../controllers/blog_controller.js');
const TutorialController = require('../controllers/tutorial_controller.js');
const TagController = require('../controllers/tag_controller.js');
const ProductController = require('../controllers/product_controller.js');
const CartController = require('../controllers/cart_controller.js');

router.get('/employee', EmployeeController.index);
router.post('/employee/show', EmployeeController.show);
router.post('/employee/store', EmployeeController.store);
router.post('/employee/destroy', EmployeeController.destroy);
router.post('/blog/store', BlogController.store);

//tutorial 
router.get('/tutorial', TutorialController.getTutorial);
router.post('/tutorial', TutorialController.createTutorial);
router.put('/tutorial/:id', TutorialController.updateTutorial);
router.delete('/tutorial/:id', TutorialController.deleteTutorial);

//Tags
router.get('/tag', TagController.getTag);
router.post('/tag', TagController.createTag);
router.put('/tag/:id', TagController.updateTag);
router.delete('/tag/:id', TagController.deleteTag);

//Products
router.get('/product', ProductController.getProduct);
router.get('/product/:id', ProductController.getSingleProduct);
router.post('/product', ProductController.createProduct);
router.put('/product/:id', ProductController.updateProduct);
router.delete('/product/:id', ProductController.deleteProduct);

//Cart
router.get('/cart', CartController.getCart);
router.post('/cart', CartController.createCart);
router.put('/cart/:id', CartController.updateCart);
router.delete('/cart/:id', CartController.deleteCart);
module.exports = router;


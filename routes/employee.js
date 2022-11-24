const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee_controller.js');
const BlogController = require('../controllers/blog_controller.js');

router.get('/employee', EmployeeController.index);
router.post('/employee/show', EmployeeController.show);
router.post('/employee/store', EmployeeController.store);
router.post('/employee/destroy', EmployeeController.destroy);
router.post('/blog/store', BlogController.store);

module.exports = router;


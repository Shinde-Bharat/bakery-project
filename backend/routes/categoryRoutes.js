// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const adminAuth = require('../middleware/adminAuth');


router.post('/', adminAuth, categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.delete('/:id', adminAuth, categoryController.deleteCategory);

module.exports = router;

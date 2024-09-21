// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;

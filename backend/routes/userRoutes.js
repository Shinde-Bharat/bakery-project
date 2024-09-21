// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', auth, userController.getUserProfile);
router.put('/profile', auth, userController.updateUserProfile);
router.post('/address', auth, userController.addAddress);
router.delete('/address/:addressId', auth, userController.deleteAddress);
router.get('/orders', auth, userController.getOrderHistory);

// Admin routes
router.put('/change-role', adminAuth, userController.changeUserRole);
router.post('/add-user', adminAuth, userController.addNewUser);
router.get('/list', adminAuth, userController.listUsers);
router.post('/create-delivery-boy', adminAuth, userController.createDeliveryBoy);

module.exports = router;


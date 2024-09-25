// routes/deliveryBoyRoutes.js
const express = require('express');
const router = express.Router();
const deliveryBoyController = require('../controllers/deliveryBoyController');
const deliveryBoyAuth = require('../middleware/deliveryBoyAuth');
const adminAuth = require('../middleware/adminAuth');

// Public routes
router.post('/login', deliveryBoyController.login);

// Delivery boy routes
router.get('/profile', deliveryBoyAuth, deliveryBoyController.getOwnProfile);
router.get('/packed-orders', deliveryBoyAuth, deliveryBoyController.getPackedOrders);
router.post('/accept-order/:orderId', deliveryBoyAuth, deliveryBoyController.acceptOrder);
router.get('/accepted-orders', deliveryBoyAuth, deliveryBoyController.getAcceptedOrders);
router.put('/update-order-status/:orderId', deliveryBoyAuth, deliveryBoyController.updateOrderStatus);

// Admin routes
router.get('/delivery-boys', adminAuth, deliveryBoyController.getAllDeliveryBoys);
router.get('/delivery-boys/:id', adminAuth, deliveryBoyController.getDeliveryBoyById);
router.put('/delivery-boys/:id', adminAuth, deliveryBoyController.updateDeliveryBoy);
router.put('/delivery-boys/:id/password', adminAuth, deliveryBoyController.updateDeliveryBoyPassword);
router.delete('/delivery-boys/:id', adminAuth, deliveryBoyController.deleteDeliveryBoy);

module.exports = router;
// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.post('/', auth, orderController.createOrder);
router.get('/', adminAuth, orderController.getOrders);
router.get('/:id', auth, orderController.getOrder);
router.get('/by-order-id/:orderId', auth, orderController.getOrderByOrderId);
router.put('/:id/status', auth, orderController.updateOrderStatus);
router.put('/:id/assign-delivery', adminAuth, orderController.assignDeliveryBoy);

module.exports = router;
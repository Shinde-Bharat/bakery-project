// routes/deliveryBoyRoutes.js
const express = require('express');
const router = express.Router();
const deliveryBoyController = require('../controllers/deliveryBoyController');
const deliveryBoyAuth = require('../middleware/deliveryBoyAuth');

router.post('/login', deliveryBoyController.login);
router.get('/packed-orders', deliveryBoyAuth, deliveryBoyController.getPackedOrders);
router.post('/accept-order/:orderId', deliveryBoyAuth, deliveryBoyController.acceptOrder);
router.get('/accepted-orders', deliveryBoyAuth, deliveryBoyController.getAcceptedOrders);
router.put('/update-order-status/:orderId', deliveryBoyAuth, deliveryBoyController.updateOrderStatus);

module.exports = router;
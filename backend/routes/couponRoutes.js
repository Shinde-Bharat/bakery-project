
// routes/couponRoutes.js
const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const adminAuth = require('../middleware/adminAuth');


router.post('/', adminAuth, couponController.createCoupon);
router.get('/', couponController.getAllCoupons);
router.get('/:id', couponController.getCoupon);
router.put('/:id', adminAuth, couponController.updateCoupon);
router.delete('/:id', adminAuth, couponController.deleteCoupon);

module.exports = router;
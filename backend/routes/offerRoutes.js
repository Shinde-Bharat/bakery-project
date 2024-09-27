
// routes/offerRoutes.js
const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const adminAuth = require('../middleware/adminAuth');


router.post('/', adminAuth, offerController.createOffer);
router.get('/', offerController.getAllOffers);
router.get('/:id', offerController.getOffer);
router.put('/:id', adminAuth, offerController.updateOffer);
router.delete('/:id', adminAuth, offerController.deleteOffer);

module.exports = router;
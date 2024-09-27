const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController')
const adminAuth = require('../middleware/adminAuth');


router.post('/', messageController.createMessage);
router.get('/', adminAuth, messageController.getAllMessages);
router.put('/:id', adminAuth, messageController.updateMessageStatus);

module.exports = router;

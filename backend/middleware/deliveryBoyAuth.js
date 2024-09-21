// middleware/deliveryBoyAuth.js
const jwt = require('jsonwebtoken');
const DeliveryBoy = require('../models/DeliveryBoy');

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const deliveryBoy = await DeliveryBoy.findById(decoded.deliveryBoyId);
        if (!deliveryBoy) {
            throw new Error();
        }
        req.deliveryBoy = deliveryBoy;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};
// middleware/deliveryBoyAuth.js
const jwt = require('jsonwebtoken');
const DeliveryBoy = require('../models/DeliveryBoy');
const tokenRefresh = require('./tokenRefresh');

const deliveryBoyAuth = (req, res, next) => {
    tokenRefresh(req, res, async (err) => {
        if (err) return next(err);

        try {
            const token = req.header('Authorization')?.replace('Bearer ', '') || req.header('x-new-token');
            if (!token) {
                throw new Error();
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const deliveryBoy = await DeliveryBoy.findById(decoded.deliveryBoyId);
            if (!deliveryBoy) {
                throw new Error();
            }
            req.deliveryBoy = deliveryBoy;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Delivery boy authentication failed' });
        }
    });
};

module.exports = deliveryBoyAuth;
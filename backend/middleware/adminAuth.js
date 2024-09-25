// middleware/adminAuth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const tokenRefresh = require('./tokenRefresh');

const adminAuth = (req, res, next) => {
    tokenRefresh(req, res, async (err) => {
        if (err) return next(err);

        try {
            const token = req.header('Authorization')?.replace('Bearer ', '') || req.header('x-new-token');
            if (!token) {
                throw new Error();
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
            if (!user || user.role !== 'admin') {
                throw new Error();
            }
            req.user = user;
            next();
        } catch (error) {
            console.log(error);

            res.status(401).json({ message: 'Admin authentication failed' });
        }
    });
};

module.exports = adminAuth;
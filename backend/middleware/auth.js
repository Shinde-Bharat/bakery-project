// middleware/auth.js
const jwt = require('jsonwebtoken');
const tokenRefresh = require('./tokenRefresh');

const auth = (req, res, next) => {
    tokenRefresh(req, res, (err) => {
        if (err) return next(err);

        try {
            const token = req.header('Authorization')?.replace('Bearer ', '') || req.header('x-new-token');
            if (!token) {
                throw new Error();
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Authentication failed' });
        }
    });
};

module.exports = auth;
// middleware/tokenRefresh.js
const jwt = require('jsonwebtoken');

const tokenRefresh = (req, res, next) => {
    const refreshToken = req.header('x-refresh-token');
    const currentToken = req.header('Authorization')?.replace('Bearer ', '');

    if (!refreshToken || !currentToken) {
        return next();
    }

    try {
        const decoded = jwt.verify(currentToken, process.env.JWT_SECRET);
        const currentTime = Math.floor(Date.now() / 1000);

        // If the token is about to expire (e.g., within 5 minutes), issue a new one
        if (decoded.exp - currentTime < 300) {
            const newToken = jwt.sign(
                { userId: decoded.userId, role: decoded.role },
                process.env.JWT_SECRET,
                { expiresIn: '12h' }
            );
            res.setHeader('x-new-token', newToken);
        }

        next();
    } catch (error) {
        // If the current token is invalid, try to use the refresh token
        try {
            const refreshDecoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const newToken = jwt.sign(
                { userId: refreshDecoded.userId, role: refreshDecoded.role },
                process.env.JWT_SECRET,
                { expiresIn: '12h' }
            );
            res.setHeader('x-new-token', newToken);
            req.user = refreshDecoded;
            next();
        } catch (refreshError) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
    }
};

module.exports = tokenRefresh;
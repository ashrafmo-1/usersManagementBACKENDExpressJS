const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) {
        return res.status(401).json({ response: 'Not authorized, no token provided' });
    };

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ response: 'Not authorized, re login please' });
    }

    try {
        const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.currentUser = currentUser;
        next();
    } catch (error) {
        return res.status(401).json({ response: 'Invalid token', error: 'token expired' });
    }
}

module.exports = verifyToken;
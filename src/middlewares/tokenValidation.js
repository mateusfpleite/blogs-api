const jwt = require('jsonwebtoken');

const tokenValidation = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Token not found' });
    }
    try {
        const result = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.headers.user = result.data.email;
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
    return next();
};

module.exports = tokenValidation;

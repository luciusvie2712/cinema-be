const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) 
        return res.status(401).json({message: 'Access denied. No token provided'})
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({message: 'Invalid token'})
    }
}

module.exports = authMiddleware
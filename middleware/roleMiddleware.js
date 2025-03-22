const jwt = requeri('jsonwebtoken')

//Kiem tra token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) return res.status(401).send('Access Denied')

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRECT)
            req.user = verified
            next()
        } catch (error) {
            res.status(400).send('Invalid Token')
        }
}

//Kiem tra quyen admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin')
        return res.status(403).send('Access Denied')
    next()
}

module.exports = { verifyToken, isAdmin }
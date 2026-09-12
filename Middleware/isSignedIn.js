
const jwt = require('jsonwebtoken')

const isSignedIn = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.payload;
        next()

    } catch (error) {
        res.status(401).json({ err: 'Login Invalid' })
    }
}

module.exports = isSignedIn



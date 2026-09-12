
const jwt = require('jsonwebtoken')

const isSignedIn = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload;
        next()

    } catch (error) {
        res.status(401).json({ err: 'Login Invalid' })
    }
}

module.exports = isSignedIn



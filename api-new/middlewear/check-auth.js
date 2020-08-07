const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    console.log('verify running')
    try {
        const token = req.cookies.access_token;
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decoded;
        next()
    } catch (error) {
        res.status(410).json({
            message: "Authentication failed"
        })
    }
}
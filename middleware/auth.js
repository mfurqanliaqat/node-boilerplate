const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token')

    if (!token) return res.status(401).send('Unauthorized! Access Denied : No token provided!')
    try {
        if (token == config.get('auth_token'))
            next()
        else 
            res.status(401).send('Unauthorized! Access Denied : Token Might be invalid or expired!')
    } catch (ex) {
        res.status(401).send('Unauthorized! Access Denied : Token Might be invalid or expired!')
    }
}

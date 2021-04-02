const jwt = require('jsonwebtoken')

const confing = require('../config')

const authMiddleware = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1] //Take token without Bearer
        if(!token){
            return res.status(401).json({'message': "Not authorized"})
        }
        const decoded = jwt.verify(token, confing.jwtsk)
        req.user = decoded //should be object with id and email
    }catch(e){
        return res.status(401).json({'message': "Not authorized"})
    }
    next()
}

module.exports = authMiddleware
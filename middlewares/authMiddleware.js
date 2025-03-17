const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')  
const User = require('../models/users')

const protect = asyncHandler(async(req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // obtenemos el token del header
            token = req.headers.authorization.split(' ')[1]

            // verificamos el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // obtenemos el usuario del token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Acceso No autorizado')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('No autorizado, no se proporciono el Token')
    }
})

module.exports = { protect }
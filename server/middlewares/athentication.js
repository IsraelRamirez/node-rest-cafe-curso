const errors = require('../errors');
const jwt = require('jsonwebtoken')

const authToken = (req, res, next) => {
    const token = req.get('token')
    if (!token)
        return res.status(401).send(errors.error("Usuario no autorizado falta"))
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err)
            return res.status(401).send(errors.error(err))

        req.usuario = decoded.usuario
        next()
    })

}

const isAdmin = (req, res, next) => {
    try {
        const role = req.usuario.role
        if (role != 'ADMIN_ROLE')
            return res.status(403).send(errors.error("Usuario sin privilegios"))

        next()
    } catch (err) {
        return res.status(500).res(errors.error(`Undefined error: ${err}`))
    }

}

module.exports = {
    authToken,
    isAdmin
}
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const errors = require('../errors')
const Usuario = require('../models/Usuario')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const signTokenJWT = (user) => {
    return jwt.sign({
        usuario: user
    }, process.env.SEED, {
        expiresIn: `${process.env.CADUCIDAD_TOKEN}m`
    })
}

const getToken = async(req, res) => {

    let login = req.body

    if (!req.body.email || !req.body.password)
        return res.status(400).send(errors.badRequest)

    const getUser = await Usuario.findOne({
        email: login.email
    })

    if (!getUser)
        return res.status(400).send(errors.error('Usuario o Contraseña incorrecto'))


    if (!bcrypt.compareSync(login.password, getUser.password))
        return res.status(400).send(errors.error('Usuario o Contraseña incorrecto'))

    const token = signTokenJWT(getUser)
    res.json({
        ok: true,
        usuario: getUser,
        token
    })


}

const verifyGoogle = async(token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return {
        nombre: payload.name,
        img: payload.picture,
        email: payload.email,
        google: true
    }
}

const verifyEmailModel = async(email) => {
    const getUser = await Usuario.findOne({ email })
    return getUser
}

const getTokenGoogle = async(req, res) => {
    const googleUser = await verifyGoogle(req.body.token)
        .catch(err => {
            return res.status(403).json(errors.error(err))
        })

    const getUser = await verifyEmailModel(googleUser.email)
        .catch(err => {
            return res.status(500).json(errors.error(err))
        })
    if (getUser) {
        if (!getUser.google)
            return res.status(403).json(errors.error(`El usuario con el email ${googleUser.email} ya se encuentra registrado, debe usar la autenticación normal`))
        else if (getUser.google) {
            const token = signTokenJWT(getUser)
            res.json({
                ok: true,
                usuario: getUser,
                token
            })
        }
    } else {
        const usuario = new Usuario()
        usuario.nombre = googleUser.nombre
        usuario.email = googleUser.email
        usuario.img = googleUser.img
        usuario.google = googleUser.google
        usuario.password = 'REBECAAAA :"('
        const newUser = await usuario.save()
            .catch(err => {
                return res.status(500).json(errors.error(err))
            })
        const token = signTokenJWT(newUser)
        res.json({
            ok: true,
            usuario: getUser,
            token
        })
    }


}

module.exports = {
    getToken,
    getTokenGoogle
}
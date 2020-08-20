const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const errors = require('../errors')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const Usuario = require('../models/Usuario')

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

    const token = jwt.sign({
        usuario: getUser
    }, process.env.SEED, {
        expiresIn: `${process.env.CADUCIDAD_TOKEN}m`
    })
    res.json({
        ok: true,
        usuario: getUser,
        token
    })


}

const verify = async(token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload
}

const getTokenGoogle = (req, res) => {
    res.json(verify(req.body.token))
}

module.exports = {
    getToken,
    getTokenGoogle
}
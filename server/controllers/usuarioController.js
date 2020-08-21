const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const _ = require('underscore')


const getUsuarios = (req, res) => {
    const desde = parseInt(req.query.desde) || 0
    const limit = parseInt(req.query.limite) || 5
    Usuario.find({ estado: true }, '')
        .skip(desde)
        .limit(limit)
        .exec()
        .then((usuarios) => {
            Usuario.countDocuments({ estado: true }, (err, cantidad) => {

                res.status(200).send({
                    ok: true,
                    usuario: usuarios,
                    cantidad
                })
            })
        }).catch((err) => {
            res.status(400).send({
                ok: false,
                message: err
            })
        });
}
const newUsuario = (req, res) => {
    const newUserInfo = new Usuario(req.body)
    newUserInfo.password = bcrypt.hashSync(newUserInfo.password, 10)
    newUserInfo.save()
        .then(() => {
            res.status(201).send({
                ok: true,
                message: "El nuevo usuario ha sido creado con éxito",
                usuario: newUserInfo
            })
        }).catch((err) => {
            res.status(400).send({
                ok: false,
                message: err
            })
        })
}

const setUsuario = (req, res) => {
    const id = req.params.id
    const newUserInfo = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])
    Usuario.findByIdAndUpdate(id, newUserInfo, {
            new: true,
            runValidators: true
        })
        .then((putUser) => {
            res.status(201).send({
                ok: true,
                message: "El usuario ha sido actualizado con éxito",
                usuario: putUser
            })
        }).catch((err) => {
            res.status(400).send({
                ok: false,
                message: err
            })
        })
}
const deleteUsuario = (req, res) => {
    const id = req.params.id
    Usuario.findByIdAndUpdate(id, { estado: false }, {
            new: true,
            runValidators: true
        })
        .then((deleteUser) => {
            res.status(201).send({
                ok: true,
                message: "El usuario ha sido deshabilitado con éxito",
                usuario: deleteUser
            })
        }).catch((err) => {
            res.status(400).send({
                ok: false,
                message: err
            })
        })
}

module.exports = {
    getUsuarios,
    newUsuario,
    setUsuario,
    deleteUsuario
}
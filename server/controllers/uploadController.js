const errors = require("../errors")
const path = require('path');
const Usuario = require('../models/Usuario')
const Producto = require('../models/Producto')
const fs = require('fs')

const validExtensions = ['png', 'jpg', 'gif', 'jpeg']
const validTypes = ['productos', 'usuarios']

const deleteOldImg = (tipo, fileNameOld) => {
    const pathOldImg = path.resolve(__dirname, `../../uploads/${tipo}/${fileNameOld}`)
    if (fs.existsSync(pathOldImg))
        fs.unlinkSync(pathOldImg)
}

const imgUsuario = async(id, res, fileName) => {
    const user = await Usuario.findById(id)
        .catch(err => {
            deleteOldImg('usuarios', fileName)
            return res.status(500).send(errors.error(err))
        })
    if (!user) {
        deleteOldImg('usuarios', fileName)
        return res.status(400).send(errors.error('Usuario no existe'))
    }

    const userImg = await Usuario.findByIdAndUpdate(id, { img: fileName }, {
            new: true
        })
        .catch(err => {
            deleteOldImg('usuarios', fileName)
            return res.status(500).send(errors.error(err))
        })

    if (!userImg) {
        deleteOldImg('usuarios', fileName)
        return res.status(400).send(errors.error('Usuario no existe'))
    }

    if (user.img !== fileName)
        deleteOldImg('usuarios', user.img)

    res.json({
        ok: true,
        message: 'Imagen subida exitosamente',
        usuario: userImg
    })
}

const imgProducto = async(id, res, fileName) => {
    const product = await Producto.findById(id)
        .catch(err => {
            deleteOldImg('productos', fileName)
            return res.status(500).send(errors.error(err))
        })
    if (!product) {
        deleteOldImg('productos', fileName)
        return res.status(400).send(errors.error('Producto no existe'))
    }

    const productImg = await Producto.findByIdAndUpdate(id, { img: fileName }, {
            new: true
        })
        .catch(err => {
            deleteOldImg('productos', fileName)
            return res.status(500).send(errors.error(err))
        })

    if (!productImg) {
        deleteOldImg('productos', fileName)
        return res.status(400).send(errors.error('Producto no existe'))
    }

    if (product.img !== fileName)
        deleteOldImg('productos', product.img)

    res.json({
        ok: true,
        message: 'Imagen subida exitosamente',
        producto: productImg
    })
}

const putFile = (req, res) => {
    const tipo = req.params.tipo
    const id = req.params.id

    if (validTypes.indexOf(tipo.toLowerCase()) < 0)
        return res.status(400).send(errors.error(`El tipo ${tipo} no es valido; Use ${validTypes}`))
    if (!req.files)
        return res.status(400).send(errors.badRequest)

    const file = req.files.sendFile
    const extension = (file.name.split('.')[file.name.split('.').length - 1])

    if (validExtensions.indexOf(extension) < 0)
        return res.status(400).send(errors.error(`La extensión ${extension} no es valida; Use ${validExtensions}`))

    const fileName = `${id}-${new Date().getMilliseconds()}.${extension}`

    file.mv(path.resolve(__dirname, `../../uploads/${tipo}/${fileName}`), (err) => {
        if (err)
            return res.status(500).json(errors.error(err))

        if (tipo.toLowerCase() === 'productos')
            imgProducto(id, res, fileName)
        if (tipo.toLowerCase() === 'usuarios')
            imgUsuario(id, res, fileName)

    })
}

module.exports = {
    putFile
}
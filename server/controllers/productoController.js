const Producto = require('../models/Producto')
const _ = require('underscore')
const errors = require('../errors')

const getProductos = async(req, res) => {
    const desde = parseInt(req.query.desde) || 0
    const limit = parseInt(req.query.limite) || 5

    const products = await Producto.find({ disponible: true })
        .skip(desde)
        .limit(limit)
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .catch(err => { return res.status(500).json(errors.error(err)) })
    const cantidad = await Producto.countDocuments({ disponible: true })


    res.json({
        ok: true,
        productos: products,
        cantidad
    })
}

const getProductosTerm = async(req, res) => {
    const term = req.params.termino
    const regEx = new RegExp(term, 'i')
    const products = await Producto.find({ nombre: regEx })
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .catch(err => { return res.status(500).json(errors.error(err)) })

    res.json({
        ok: true,
        productos: products
    })
}

const getProducto = async(req, res) => {
    const id = req.params.id
    const product = await Producto.find()
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .catch(err => { return res.status(500).json(errors.error(err)) })

    if (!product)
        return res.status(400).json(errors.badRequest)

    res.json({
        ok: true,
        producto: product
    })
}

const newProducto = async(req, res) => {
    const newProduct = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'disponible', 'categoria'])
    newProduct.usuario = req.usuario._id
    if (!newProduct.nombre || !newProduct.precioUni || !newProduct.categoria)
        return res.status(400).json(errors.badRequest)

    const product = await Producto.create(newProduct)
        .catch(err => { return res.status(500).json(errors.error(err)) })

    if (!product)
        return res.status(400).json(errors.badRequest)

    res.json({
        ok: true,
        message: 'Producto ha sido creado exitosamente',
        producto: product
    })
}

const setProducto = async(req, res) => {
    const id = req.params.id
    const newProduct = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'disponible', 'categoria'])
    const product = await Producto.findByIdAndUpdate(id, newProduct, {
            new: true
        })
        .catch(err => { return res.status(500).json(errors.error(err)) })
    if (!product)
        return res.status(400).json(errors.error('El producto ingresado no existe'))

    res.json({
        ok: true,
        message: 'Producto ha sido actualizado exitosamente',
        producto: product
    })
}

const deleteProducto = async(req, res) => {
    const id = req.params.id
    const product = await Producto.findByIdAndUpdate(id, { disponible: false }, {
            new: true,
            runValidators: true
        })
        .catch(err => { return res.status(500).json(errors.error(err)) })
    if (!product)
        return res.status(400).json(errors.error('El producto ingresado no existe'))
    res.json({
        ok: true,
        message: 'Producto ha sido eliminado exitosamente',
        producto: product
    })
}

module.exports = {
    getProductos,
    getProductosTerm,
    getProducto,
    newProducto,
    setProducto,
    deleteProducto
}
const Categoria = require('../models/Categoria')
const errors = require('../errors')
const _ = require('underscore')

const getCategorias = async(req, res) => {
    const categories = await Categoria.find()
        .catch(err => {
            return res.status(500).json(errors.error(err))
        })

    res.json({
        ok: true,
        categorias: categories
    })
}

const getCategoria = async(req, res) => {
    const id = req.params.id
    const categoria = await Categoria.findById(id)
        .catch(err => {
            return res.status(500).json(errors.error(err))
        })
    if (!categoria)
        return res.status(404).json(errors.error(`El id ${id} no está registrado en la base de datos`))
    res.json({
        ok: true,
        categoria: categoria
    })
}

const newCategoria = async(req, res) => {
    const _id = req.usuario._id
    if (!req.body.descripcion)
        return res.status(400).json(errors.badRequest())
    const categoria = new Categoria({
        descripcion: req.body.descripcion,
        usuario: _id
    })

    const newCategory = await categoria.save()
        .catch(err => {
            return res.status(500).json(errors.error(err))
        })

    if (!newCategory)
        return res.status(500).json(errors.error('Hubo algun problema con la base de datos'))

    res.json({
        ok: true,
        message: "Se ha creado con exito la categoría",
        categoria: newCategory
    })
}

const setCategoria = async(req, res) => {
    const _id = req.usuario._id
    const idCategory = req.params.id

    if (!idCategory || !req.body.descripcion)
        return res.status(400).json(errors.badRequest())

    const newCategoryInfo = _.pick(req.body, ['descripcion'])
    newCategoryInfo.usuario = _id

    const category = await Categoria.findByIdAndUpdate(idCategory, newCategoryInfo, {
            new: true
        })
        .catch(err => { return res.status(400).json(errors.error('El id ingresado no existe')) })
    if (!category)
        return res.status(500).json(errors.error('Ha ocurrido un problema no controlado'))

    res.json({
        ok: true,
        message: "Se ha modificado con exito la categoría",
        categoria: category
    })
}

const deleteCategoria = async(req, res) => {
    const idCategory = req.params.id

    if (!idCategory)
        return res.status(400).json(errors.badRequest())

    const category = await Categoria.findByIdAndDelete(idCategory)
        .catch(err => { return res.status(400).json(errors.error('El id ingresado no existe')) })
    if (!category)
        return res.status(500).json(errors.error('Ha ocurrido un problema no controlado'))

    res.json({
        ok: true,
        message: "Se ha eliminado con exito la categoría",
        categoria: category
    })
}
module.exports = {
    getCategoria,
    getCategorias,
    newCategoria,
    setCategoria,
    deleteCategoria
}
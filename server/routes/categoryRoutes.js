const express = require('express')
const router = express.Router()
const { authToken, isAdmin } = require('../middlewares/athentication')
const categoriaControllers = require('../controllers/categoriaController')

module.exports = () => {
    router.get('/categoria', authToken, categoriaControllers.getCategorias)
    router.get('/categoria/:id', authToken, categoriaControllers.getCategoria)
    router.post('/categoria', authToken, categoriaControllers.newCategoria)
    router.put('/categoria/:id', authToken, categoriaControllers.setCategoria)
    router.delete('/categoria/:id', authToken, isAdmin, categoriaControllers.deleteCategoria)
    return router
}
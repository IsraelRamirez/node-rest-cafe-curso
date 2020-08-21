const express = require('express')
const router = express.Router()
const productoControllers = require('../controllers/productoController')
const { authToken } = require('../middlewares/athentication')

module.exports = () => {
    router.get('/producto', authToken, productoControllers.getProductos)
    router.get('/producto/:id', authToken, productoControllers.getProducto)
    router.get('/producto/buscar/:termino', authToken, productoControllers.getProductosTerm)
    router.post('/producto', authToken, productoControllers.newProducto)
    router.put('/producto/:id', authToken, productoControllers.setProducto)
    router.delete('/producto/:id', authToken, productoControllers.deleteProducto)

    return router
}
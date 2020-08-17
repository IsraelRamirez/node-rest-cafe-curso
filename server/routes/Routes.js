const express = require('express')
const router = express.Router()

const usuarioControllers = require('../controllers/usuarioController')

module.exports = () => {
    // Usuario
    router.get("/usuario", usuarioControllers.getUsuarios)
    router.get("/usuario/:id", usuarioControllers.getUsuario)
    router.post("/usuario", usuarioControllers.newUsuario)
    router.put("/usuario/:id", usuarioControllers.setUsuario)
    router.delete("/usuario/:id", usuarioControllers.deleteUsuario)

    return router
}
const express = require('express')
const router = express.Router()

const { authToken, isAdmin } = require('../middlewares/athentication')
const usuarioControllers = require('../controllers/usuarioController')

module.exports = () => {
    // Usuario
    router.get("/usuario", authToken, isAdmin, usuarioControllers.getUsuarios)
    router.get("/usuario/:id", authToken, isAdmin, usuarioControllers.getUsuario)
    router.post("/usuario", authToken, isAdmin, usuarioControllers.newUsuario)
    router.put("/usuario/:id", authToken, isAdmin, usuarioControllers.setUsuario)
    router.delete("/usuario/:id", authToken, isAdmin, usuarioControllers.deleteUsuario)

    return router
}
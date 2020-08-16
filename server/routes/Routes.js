const express = require('express')
const router = express.Router()

module.exports = () => {

    router.get("/", (req, res) => {
        res.status(201)
        res.send("Inicio")
    })

    router.get("/hola", (req, res) => {
        res.send("Hola")
    })

    router.get("/data", (req, res) => {
        res.send("Data")
    })

    return router
}
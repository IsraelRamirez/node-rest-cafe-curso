const express = require('express')
const router = express.Router()

const imgControllers = require('../controllers/imgController')

module.exports = () => {

    router.get('/image/:tipo/:img', imgControllers.getImg)

    return router
}
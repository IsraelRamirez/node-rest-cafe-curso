const express = require('express')
const router = express.Router()

const loginControllers = require('../controllers/loginController')

module.exports = () => {

    router.post('/login', loginControllers.getToken)
    router.post('/google', loginControllers.getTokenGoogle)
    return router
}
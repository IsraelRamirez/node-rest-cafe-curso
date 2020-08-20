const express = require('express')
const router = express.Router()

const userRoutes = require('./userRoutes')
const loginRoutes = require('./loginRoutes')

module.exports = () => {

    router.use(userRoutes())
    router.use(loginRoutes())

    return router
}
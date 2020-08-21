const express = require('express')
const router = express.Router()

const userRoutes = require('./userRoutes')
const loginRoutes = require('./loginRoutes')
const categoryRoutes = require('./categoryRoutes')
module.exports = () => {

    router.use(userRoutes())
    router.use(categoryRoutes())
    router.use(loginRoutes())

    return router
}
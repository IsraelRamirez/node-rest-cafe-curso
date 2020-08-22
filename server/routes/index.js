const express = require('express')
const router = express.Router()

const userRoutes = require('./userRoutes')
const loginRoutes = require('./loginRoutes')
const categoryRoutes = require('./categoryRoutes')
const productRoutes = require('./productRoutes')
const uploadRoutes = require('./uploadRoutes')
const imgRoutes = require('./imgRoutes')
module.exports = () => {

    router.use(userRoutes())
    router.use(categoryRoutes())
    router.use(productRoutes())
    router.use(loginRoutes())
    router.use(uploadRoutes())
    router.use(imgRoutes())

    return router
}
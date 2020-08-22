const express = require('express')
const fileUpload = require('express-fileupload')
const router = express.Router()
const { authToken } = require('../middlewares/athentication')
const uploadControllers = require('../controllers/uploadController')

module.exports = () => {
    router.use(fileUpload())
    router.put('/upload/:tipo/:id', authToken, uploadControllers.putFile)

    return router
}
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const categoriaSchema = new Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripción es necesario'],
        unique: true
    },
    usuario: {
        type: String,
        required: [true, 'El id del usuario es necesario']
    }
})

categoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})

module.exports = mongoose.model('categorias', categoriaSchema)
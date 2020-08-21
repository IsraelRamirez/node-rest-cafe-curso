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
        type: Schema.Types.ObjectId,
        required: [true, 'El id del usuario es necesario'],
        ref: 'usuarios'
    }
})

categoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})

module.exports = mongoose.model('categorias', categoriaSchema)
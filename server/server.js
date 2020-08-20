require('./config/config')
const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path');
const app = express()

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))
app.use(routes())

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
})
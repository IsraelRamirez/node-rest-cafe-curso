require('./config/config')
const express = require('express')
const routes = require('./routes/Routes')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use("/", routes())

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
})
const fs = require('fs');
const path = require('path');
const validTypes = ['productos', 'usuarios']

const getImg = (req, res) => {
    const tipo = req.params.tipo
    const fileName = req.params.img
    const pathImg = `../../uploads/${tipo}/${fileName}`

    if (validTypes.indexOf(tipo.toLowerCase()) < 0)
        return res.sendFile(path.resolve(__dirname, '../assets/no-image.jpg'))

    if (!fs.existsSync(path.resolve(__dirname, pathImg)))
        return res.sendFile(path.resolve(__dirname, '../assets/no-image.jpg'))

    res.sendFile(path.resolve(__dirname, pathImg))

}

module.exports = {
    getImg
}
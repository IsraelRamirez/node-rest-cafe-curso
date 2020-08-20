const badRequest = {
    ok: false,
    message: 'Faltan datos por ingresar'
}

const error = (message) => ({
    ok: false,
    message
})

module.exports = {
    badRequest,
    error
}
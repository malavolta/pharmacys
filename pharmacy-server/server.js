'use strict'

const http = require('http')
const express = require('express')
const app = express()
const api = require('./api')


const server = http.createServer(app)
const port = process.env.PORT || 3000


if (!module.parent) {
    process.on('uncaughtException', handleFaltalError)
    process.on('unhandledRejection', handleFaltalError)

    app.use('/api', api)

    server.listen(port, () => {
        console.log(`server listening on port ${port}`)
    })
}

function handleFaltalError(err) {
    console.error(err.message)
    console.error(err.stack)
    process.exit(1)
}

module.exports = server
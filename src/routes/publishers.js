const express = require('express')
const routes = express.Router()

const publishers = require('../controller/publishers')

routes.get('/', publishers.gets)
routes.get('/:publisherId', publishers.get)
routes.put('/:publisherId', publishers.put)
routes.post('/', publishers.post)
routes.delete('/:publisherId', publishers.delete)

module.exports = routes
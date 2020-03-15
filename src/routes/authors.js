const express = require('express')
const routes = express.Router()

const authors = require('../controller/authors')

routes.get('/', authors.gets)
routes.get('/:authorId', authors.get)
routes.put('/:authorId', authors.put)
routes.post('/', authors.post)
routes.delete('/:authorId', authors.delete)

module.exports = routes
const express = require('express')
const routes = express.Router()

const categories = require('../controller/categories')

routes.get('/', categories.gets)
routes.get('/:categoryId', categories.get)
routes.put('/:categoryId', categories.put)
routes.post('/', categories.post)
routes.delete('/:categoryId', categories.delete)

module.exports = routes
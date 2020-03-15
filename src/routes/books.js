const express = require('express')
const routes = express.Router()

const books = require('../controller/books')

routes.get('/', books.gets)
routes.get('/:bookId', books.get)
routes.put('/:bookId', books.put)
routes.post('/', books.post)
routes.delete('/:bookId', books.delete)

module.exports = routes
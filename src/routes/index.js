const express = require('express')
const indexRoute = express.Router()

const booksRoute = require('./books')
const loansRoute = require('./loans')
const authorsRoute = require('./authors')
const publishersRoute = require('./publishers')
const membersRoute = require('./members')
const categoriesRoute = require('./categories')

indexRoute.use('/books', booksRoute)
indexRoute.use('/loans', loansRoute)
indexRoute.use('/authors', authorsRoute)
indexRoute.use('/publishers', publishersRoute)
indexRoute.use('/members', membersRoute)
indexRoute.use('/categories', categoriesRoute)

module.exports = indexRoute

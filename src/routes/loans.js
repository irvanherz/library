const express = require('express')
const routes = express.Router()

const loans = require('../controller/loans')

routes.get('/', loans.gets)
routes.get('/:loanId', loans.get)
routes.put('/:loanId', loans.put)
routes.post('/', loans.post)
routes.delete('/:loanId', loans.delete)

module.exports = routes
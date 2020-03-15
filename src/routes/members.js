const express = require('express')
const routes = express.Router()

const members = require('../controller/members')

routes.get('/', members.gets)
routes.get('/:memberId', members.get)
routes.put('/:memberId', members.put)
routes.post('/', members.post)
routes.delete('/:memberId', members.delete)

module.exports = routes
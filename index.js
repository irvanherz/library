const express = require('express')
const dotenv = require('dotenv').config()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const indexRoute = require('./src/routes/index')
const cors = require('cors')

var corsOptions = {
	origin: 'http://localhost:3000'
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/assets', express.static('./uploads'))
app.use('/', cors(corsOptions), indexRoute)

const server = app.listen(process.env.PORT, process.env.HOST, () => {
	console.log(`Listening on ${process.env.HOST}:${process.env.PORT}`)
})

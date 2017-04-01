const morgan = require('morgan')
const bodyParser = require('body-parser')

module.exports = function (app) {
  'use strict'
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
}

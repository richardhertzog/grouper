const path = require('path')
require(path.join(__dirname, './config/config.js'))()
const express = require('express')
const apiRouter = require(path.join(__dirname, './routers/apirouter.js'))
const authRouter = require(path.join(__dirname, './routers/authRouter.js'))

const app = express()
module.exports = app

// middleware
require('./middleware.js')(app)

// static files
app.use(express.static(path.join(__dirname, '../public')))
app.use('/dist', express.static(path.join(__dirname, '../dist')))

// Routers
app.use('/api', apiRouter)
app.use('/auth', authRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('server listening on port:', PORT)
})

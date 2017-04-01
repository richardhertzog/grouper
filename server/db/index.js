const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/grouper-main')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('MongoDB -Grouper DB- is now connected to the server...')
})

module.exports = db

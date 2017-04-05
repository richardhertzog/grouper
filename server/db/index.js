const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('MongoDB ' + process.env.MONGO_URL + ' is now connected to the server...')
})

module.exports = db

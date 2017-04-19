const mongoose = require('mongoose')
const path = require('path')
require(path.join(__dirname, '../index.js'))

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: String,
  groups: Array,
  businesses: Array
})

var User = mongoose.model('User', userSchema)

module.exports = User

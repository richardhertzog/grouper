const mongoose = require('mongoose')
const path = require('path')
const db = require(path.join(__dirname, '../index.js'))

const groupSchema = mongoose.Schema({
  groupName: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  votes: Array,
  yelpApiContent: Array,
  isVoting: {
    type: Boolean,
    default: true
  },
  winner: Object
})

var Group = mongoose.model('Group', groupSchema)

module.exports = Group

const mongoose = require('mongoose')
const path = require('path')
require(path.join(__dirname, '../index.js'))

const voteSchema = mongoose.Schema({
  yelpApiId: {
    type: String,
    required: true
  },
  vote: {
    type: Number,
    required: true,
    default: 0
  }
})

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
  votes: [voteSchema],
  yelpApiContent: Array,
  isVoting: {
    type: Boolean,
    default: true
  },
  winner: Object,
  endTime: {
    type: Number,
    default: Date.now() + 120000
  }
})

var Group = mongoose.model('Group', groupSchema)

module.exports = Group

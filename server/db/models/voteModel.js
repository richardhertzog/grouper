const mongoose = require('mongoose')
const path = require('path')
require(path.join(__dirname, '../index.js'))

const voteSchema = mongoose.Schema({
  groupId: String,
  votes: [{
    id: {
      type: String,
      required: true
    },
    vote: {
      type: Number,
      required: true,
      default: 0
    }
  }]
})

let Vote = mongoose.model('Group', voteSchema)

module.exports = Vote

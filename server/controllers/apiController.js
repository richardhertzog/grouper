const path = require('path')
const Group = require(path.join(__dirname, './../db/models/groupModel.js'))
const yelpAPI = require(path.join(__dirname, './../controllers/yelpController.js'))
const calculateWinner = require('../utils/calculateWinner.js')

function getGroups (req, res) {
  Group.find().then(function (data) {
    res.status(200).json(data)
  })
  .catch((err) => {
    console.error('Error fetching group')
    res.status(501).send(err)
  })
}

function createGroup (req, res) {
  yelpAPI(req, res)
  .then((group) => {
    new Group(group)
    .save()
    .then(
      (data) => {
        res.status(201).json({groupName: group.groupName})
      },
      (err) => {
        console.error('Error POSTing new client group')
        res.status(501).send(err)
      }
    )
  })
  .catch((err) => {
    console.log(err)
    res.status(400).send(err)
  })
}

function getOneGroup (req, res) {
  let groupName = req.params.groupName
  Group.findOne({groupName: groupName})
  .then((group) => {
    if (group.votes.length > 40 || group.endTime < Date.now()) {
      let temp = calculateWinner.calculateWinner(group)
      Group.update({_id: temp._id}, {
        winner: temp.winner,
        isVoting: temp.isVoting
      }, function (err, data) {
        if (err) { console.log(err) }
        return data
      })
    }
    if (group.isVoting === false) {
      return group
    } else {
      return group
    }
  })
  .then((group) => {
    res.status(200).json(group)
  })
  .catch((err) => {
    console.error('[Error fetching group]')
    res.status(501).send('[Error fetching group]', err)
  })
}

function addVote (req, res) {
  let groupName = req.params.groupName
  Group.findOne({ groupName: groupName })
  .then((group) => {
    req.body.key.map((vote) => {
      group.votes.push({
        yelpApiId: vote.yelpApiId,
        vote: vote.vote
      })
    })
    return group
  })
  .then((group) => {
    group.save()
    .then(() => {
      res.status(201).send('Votes saved to db')
    }).catch((err) => {
      console.error('Error Saving to DB')
      res.status(501).send(err)
    })
  })
  .catch((err) => {
    console.error('[Error fetching group]')
    res.status(501).send(err)
  })
}

module.exports.getGroups = getGroups
module.exports.createGroup = createGroup
module.exports.getOneGroup = getOneGroup
module.exports.addVote = addVote

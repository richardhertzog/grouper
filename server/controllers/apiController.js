const path = require('path')
const Group = require(path.join(__dirname, './../db/models/groupModel.js'))
const yelpAPI = require(path.join(__dirname, './../controllers/yelpController.js'))

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
      .then((data) => {
        res.status(201).json({groupName: group.groupName})
      })
      .catch((err) => {
        console.error('Error POSTing new client group')
        res.status(501).send(err)
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

function getOneGroup (req, res) {
  let groupName = req.params.groupName
  Group.find({groupName: groupName})
  .then(function (data) {
    res.status(200).json(data[0])
  })
  .catch((err) => {
    console.error('[Error fetching group]')
    res.status(501).send('[Error fetching group]', err)
  })
}

function addVote (req, res) {
  // find the group
  console.log('req.params.groupName', req.params.groupName)
  let groupName = req.params.groupName
  Group.findOne({ groupName: groupName })
      .then(function (group) {
        console.log('group in then', group)
        group.votes.push({
          yelpApiId: req.body.yelpApiId,
          vote: req.body.vote
        })
        group.save()
        .then(() => {
          res.status(201).send('Votes saved to db')
        })
        .catch((err) => {
          console.error('[Error saving vote to DB]')
          res.status(501).send('[Error saving vote to DB]', err)
        })
      })
      .catch((err) => {
        console.error('[Error fetching group]')
        res.status(501).send('[Error fetching group]', err)
      })
  // push vote to group
}

module.exports.getGroups = getGroups
module.exports.createGroup = createGroup
module.exports.getOneGroup = getOneGroup
module.exports.addVote = addVote

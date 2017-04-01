const router = require('express').Router()
const path = require('path')
const Group = require(path.join(__dirname, './../db/models/groupModel.js'))

const yelpAPI = require(path.join(__dirname, './../controllers/yelpController.js'))

router.get('/groups', function (req, res) {
  Group.find().then(function (data) {
    res.status(200).json(data)
  })
  .catch((err) => {
    console.error('Error fetching group')
    res.status(501).send(err)
  })
})

router.post('/groups', (req, res) => {
  yelpAPI(req, res)
    .then((group) => {
      new Group(group)
      .save()
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => {
        console.error('Error POSTing new client group')
        res.status(501).send(err)
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router

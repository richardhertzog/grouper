const router = require('express').Router();
const path = require('path');
const Group = require(path.join(__dirname, './../db/models/groupModel.js'));

router.get('/groups', function(req, res) {
  Group.find().then(function(data) {
    console.log('GET', data);
    res.status(200).json(data);
  }).catch((err) => {
    console.error('Error fetching group');
    res.status(501).send(err);
  });
});

router.post('/groups', (req, res) => {
  let group = {
      groupName: req.body.groupName,
      location: req.body.location,
      eventType: req.body.eventType
    };

  new Group(group).save().then(function(data) {
    console.log('POST', data);
    res.status(201).json(data);
  }).catch((err) => {
    console.error('Error POSTing new client group');
    res.status(501).send(err);
  });
});

module.exports = router;

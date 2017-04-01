const router = require('express').Router();
const path = require('path');
const Group = require(path.join(__dirname, './../db/models/groupModel.js'));
require(path.join(__dirname, './../config.js'))();
const yelp = require('yelp-fusion');
// require(path.join(__dirname, './../config.js'))();
// const yelp = require('yelp-fusion');

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

  const clientId = process.env.YELP_APP_ID;
  const clientSecret = process.env.YELP_APP_SECRET;

  const searchRequest = {
    term: req.body.eventType,
    location: req.body.location
  };
  yelp.accessToken(clientId, clientSecret)
  .then(response => {
    const client = yelp.client(response.jsonBody.access_token);
    client.search(searchRequest)
    .then((response) => {
      let group = {
        groupName: req.body.groupName,
        location: req.body.location,
        eventType: req.body.eventType,
        yelpApiContent: response.jsonBody.businesses
      };
      new Group(group)
      .save()
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        console.error('Error POSTing new client group');
        res.status(501).send(err);
      });

    });
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;

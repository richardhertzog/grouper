const yelp = require('yelp-fusion')
const clientId = process.env.YELP_APP_ID
const clientSecret = process.env.YELP_APP_SECRET

function getAll (req, res) {

  const searchRequest = {
    term: req.body.eventType,
    location: req.body.location,
    limit: 10,
    open_now: true
  }

  return yelp.accessToken(clientId, clientSecret)
    .then(response => {
      const client = yelp.client(response.jsonBody.access_token)
      return client.search(searchRequest)
    })
    .then(response => {
      return response.jsonBody.businesses
    })
    .then((response) => {
      return {
        groupName: req.body.groupName,
        location: req.body.location,
        eventType: req.body.eventType,
        endTime: req.body.endTime,
        yelpApiContent: response
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function getWinner (req, res) {

  const searchRequest = {
    id: req.body.id
  }

  return yelp.accessToken(clientId, clientSecret)
    .then(response => {
      const client = yelp.client(response.jsonBody.access_token)
      return client.business(searchRequest.id)
      .then(response => {
        return response.jsonBody
      })
      .catch(err => {
        console.error(err)
      })
  })
}

module.exports.getAll = getAll
module.exports.getWinner = getWinner

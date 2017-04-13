const yelp = require('yelp-fusion')

module.exports = (req, res) => {
  const clientId = process.env.YELP_APP_ID
  const clientSecret = process.env.YELP_APP_SECRET

  const searchRequest = {
    term: req.body.eventType,
    location: req.body.location
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
}

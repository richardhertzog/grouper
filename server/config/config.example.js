const YELP_APP_ID = ''
const YELP_APP_SECRET = ''

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const configEnv = require('./' + process.env.NODE_ENV)

let config = function () {
  process.env.YELP_APP_ID = YELP_APP_ID
  process.env.YELP_APP_SECRET = YELP_APP_SECRET
  process.env.MONGO_URL = configEnv.mongoUrl
}

module.exports = config

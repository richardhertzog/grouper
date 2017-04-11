const YELP_APP_ID = 'nlCNUhUse6ZfO-1pOPhw7A'
const YELP_APP_SECRET =
  'BL2ZZ5nx8xZ1u5JCpjMds9Sp4XpzSAcymI7PQEXU3s6iblEQXfKmSfXK75Mafh0P'
const AUTH_SECRET = 'refactoring!is$a^great*learning$experience$funtime'
const PUBLISH_KEY = 'pub-c-f0ec26a2-39d3-4de5-9a1b-c354bfa8c7cf'
const SUBSCRIBE_KEY = 'sub-c-fb710490-1e5b-11e7-bd07-02ee2ddab7fe'
const SECRET_KEY = 'sec-c-MjQzODA4YWMtYzBhZC00ODc1LWJmMWEtMjZjNWI5YmYzODYw'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const configEnv = require('./' + process.env.NODE_ENV)

let config = function () {
  process.env.AUTH_SECRET = AUTH_SECRET
  process.env.YELP_APP_ID = YELP_APP_ID
  process.env.YELP_APP_SECRET = YELP_APP_SECRET
  process.env.MONGO_URL = configEnv.mongoUrl
  process.env.PUBLISH_KEY = PUBLISH_KEY
  process.env.SUBSCRIBE_KEY = SUBSCRIBE_KEY
  process.env.SECRET_KEY = SECRET_KEY
}

module.exports = config

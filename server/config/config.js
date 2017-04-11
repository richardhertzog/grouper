const YELP_APP_ID = 'nlCNUhUse6ZfO-1pOPhw7A'
const YELP_APP_SECRET =
  'BL2ZZ5nx8xZ1u5JCpjMds9Sp4XpzSAcymI7PQEXU3s6iblEQXfKmSfXK75Mafh0P'
const AUTH_SECRET = 'refactoring!is$a^great*learning$experience$funtime'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const configEnv = require('./' + process.env.NODE_ENV)

let config = function () {
  process.env.AUTH_SECRET = AUTH_SECRET
  process.env.YELP_APP_ID = YELP_APP_ID
  process.env.YELP_APP_SECRET = YELP_APP_SECRET
  process.env.MONGO_URL = configEnv.mongoUrl
}

module.exports = config

const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const path = require('path')

const User = require(path.join(__dirname, '../db/models/userModel.js'))

exports.signUp = (req, res) => {
  const { username, password } = req.body
  User.findOne({ username })
  .then((user) => {
    if (!user) {
      bcrypt.hash(password, null, null, (err, hash) => {
        if (err) { console.error(err) }
        let newUser = {
          'username': username,
          'password': hash
        }
        new User(newUser)
        .save()
        .then((data) => {
          res.status(200).json({ token: createToken(data), username: username })
        })
      })
    } else {
      res.status(400).json({ 'message': 'username taken' })
    }
  })
  .catch((err) => {
    console.error('[Error looking up user]', err)
  })
}

exports.signIn = (req, res) => {
  const { username, password } = req.body
  User.findOne({ username })
  .then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) { console.error(err) }
        if (match) {
          console.log('user', user)
          res.status(200).json({ token: createToken(user), username: username })
        } else {
          res.status(404).send('invalid credentials')
        }
      })
    } else {
      res.status(400).json({ 'message': 'username does not exist' })
    }
  })
  .catch((err) => {
    console.error('[Error looking up user]', err)
  })
}

exports.checkAuth = (req, res) => {
  let { token, user } = req.body
  compareToken(token, user)
}

function createToken (user) {
  const timeStamp = new Date().getTime()
  const payload = {
    jti: 'onetime',
    iat: timeStamp,
    exp: timeStamp + 10000000,
    username: user.username,
    admin: false
  }

  console.log(jwt.encode(payload, process.env.AUTH_SECRET))
  return jwt.encode(payload, process.env.AUTH_SECRET)
}

function compareToken (token, username) {
  let decoded = jwt.decode(token, process.env.AUTH_SECRET)
  console.log(decoded.username === username)
  // return decoded
}

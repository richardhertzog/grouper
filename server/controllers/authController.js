console.log('in auth controller')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const path = require('path')

const User = require(path.join(__dirname, '../db/models/userModel.js'))

function createToken (user) {
  const timeStamp = new Date().getTime()
  const payload = {
    jti: 'onetime',
    iat: timeStamp,
    exp: timeStamp + 1000000
  }
  console.log(jwt.encode(payload, process.env.AUTH_SECRET))
  return jwt.encode(payload, process.env.AUTH_SECRET)
}

exports.signUp = (req, res) => {
  console.log('in signup')
  const { username, password } = req.body
  User.findOne({ username })
  .then((user) => {
    if (!user) {
      let newUser = {
        'username': username,
        'password': password
      }

      new User(newUser)
      .save()
      .then((data) => {
        console.log('after save response', data)
        res.status(200).json({ 'user': data })
      })
    } else {
      res.status(400).json({ 'message': 'username taken' })
    }
  })
  .catch((err) => {
    console.error('[Error looking up user]', err)
  })

  // .then((result) => {
  //   if (!result[0]) {
  //     res.status(400).json({ 'error_message': 'username taken' })
  //   }
  //   bcrypt.hash(password, null, null, (err, hash) => {
  //     if (err) { console.error(err) }
  //     const user = new User({ username, password: hash })
  //     user.save().then(() => {
  //       res.status(200).json({ token: createToken(user) })
  //     })
  //   })
  // })
}

const comparePassword = function (password, userPassword, cb) {
  bcrypt.compare(password, userPassword, (err, match) => {
    if (err) return cb(err)
    cb(null, match)
  })
}

exports.signIn = (req, res) => {
  console.log('in signin')
  const { username, password } = req.body
  User.find({ username }).then(([result]) => {
    console.log('result:', result)
    if (!result) {
      res.status(400).json({ 'error_message': 'username does not exist' })
    }
    bcrypt.compare(password, result.password, (err, match) => {
      if (err) { console.error(err) }
      if (match) {
        return res.status(200).json({ token: createToken(result) })
      }
      return res.status(400).json({ 'error_message': 'incorrect password' })
    })
  })
}

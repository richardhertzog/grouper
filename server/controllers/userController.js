const path = require('path')
const User = require(path.join(__dirname, '../db/models/userModel.js'))

exports.addGroup = (req, res) => {
  const { username, group } = req.body
  User.findOneAndUpdate({ username }, { '$push': { 'groups': group } }, function (err, doc) {
    if (err) {
      console.log('Something wrong when updating addBusiness!')
    }
  })
}

exports.addBusiness = (req, res) => {
  const { username, business } = req.body
  User.findOneAndUpdate({ username }, { '$push': { 'businesses': business } }, function (err, doc) {
    if (err) {
      console.log('Something wrong when updating addBusiness!')
    }
  })
}

exports.showGroups = (req, res) => {
  const { username } = req.body
  User.findOne({ username }, function (err, doc) {
    if (err) { console.error(err) }
    res.json({ groups: doc.groups })
  })
  .catch((err) => { console.error(err) })
}

exports.showBusinesses = (req, res) => {
  const { username } = req.body
  User.findOne({ username }, function (err, doc) {
    if (err) { console.error(err) }
    res.json({ businesses: doc.businesses })
  })
  .catch((err) => { console.error(err) })
}

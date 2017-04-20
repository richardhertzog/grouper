const path = require('path')
const User = require(path.join(__dirname, '../db/models/userModel.js'))

exports.addGroup = (req, res) => {
  const { username, group } = req.body
  User.findOneAndUpdate({ username }, { '$push': { 'groups': group } }, function (err, doc) {
    if (err) {
      console.log('Something wrong when updating addBusiness!')
    }

    console.log(doc)
  })
}

exports.addBusiness = (req, res) => {
  const { username, business } = req.body
  User.findOneAndUpdate({ username }, { '$push': { 'businesses': business } }, function (err, doc) {
    if (err) {
      console.log('Something wrong when updating addBusiness!')
    }

    console.log(doc)
  })
}

exports.showGroups = (req, res) => {
  console.log(req.body, 'in groups')
  const { username } = req.body
  User.findOne({ username }, function (err, doc) {
    if (err) { console.error(err) }
    return doc
  })
}

exports.showBusinesses = (req, res) => {
  console.log(req.body, 'in businesses')
  const { username } = req.body
  User.findOne({ username }, function (err, doc) {
    if (err) { console.error(err) }
    return doc
  })
}

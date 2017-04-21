const router = require('express').Router()
const path = require('path')
const apiController = require(path.join(__dirname, '../controllers/apiController.js'))

router.get('/groups', apiController.getGroups)
router.get('/groups/:groupName', apiController.getOneGroup)
router.post('/groups/:groupName/votes', apiController.addVote)
router.post('/groups', apiController.createGroup)
router.get('/groups/:groupName/winner', apiController.getWinner)

module.exports = router

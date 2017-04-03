const router = require('express').Router()
const apiController = require('../controllers/apiController.js')

router.get('/groups', apiController.getGroups)
router.get('/groups/:groupName', apiController.getOneGroup)
router.post('/groups/:groupName/votes', apiController.addVote)
router.post('/groups', apiController.createGroup)
router.get('/groups/:groupName/votes', apiController.getVotes)

module.exports = router

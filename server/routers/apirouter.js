const router = require('express').Router()
const apiController = require('../controllers/apiController.js')

router.get('/groups', apiController.getGroups)

router.get('/groups/:groupName', apiController.getOneGroup)

router.post('/groups', apiController.createGroup)


module.exports = router
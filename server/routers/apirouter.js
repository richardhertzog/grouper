const router = require('express').Router()
const apiController = require('../controllers/apiController.js')

router.get('/groups', apiController.getGroups)

router.post('/groups', apiController.createGroup)

module.exports = router
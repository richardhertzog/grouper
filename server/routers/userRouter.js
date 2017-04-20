const router = require('express').Router()
const path = require('path')
const userController = require(path.join(__dirname, '../controllers/userController.js'))

router.post('/addGroup', userController.addGroup)
router.post('/addBusiness', userController.addBusiness)
router.get('/showGroups', userController.showGroups)
router.get('/showBusinesses', userController.showBusinesses)

module.exports = router

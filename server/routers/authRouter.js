const router = require('express').Router()
const path = require('path')
const authController = require(path.join(__dirname, '../controllers/authController.js'))

router.post('/signup', authController.signUp)
router.post('/signin', authController.signIn)
router.get('/checkAuth', authController.checkAuth)

module.exports = router

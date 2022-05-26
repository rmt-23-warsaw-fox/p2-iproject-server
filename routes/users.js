const express = require('express')
const router = express.Router()
const UserController = require('../controllers/usercontroller')

router.post('/register', UserController.register)
router.post('/login',UserController.login)
router.post('/google-login',UserController.googleLogin)

module.exports = router
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/register', UserController.userRegister)
router.post('/login-google', UserController.loginGoogle)
router.post('/login', UserController.login)

module.exports = router
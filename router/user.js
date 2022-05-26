const express = require("express");
const router = express.Router();
const Controller = require('../controllers/user')


router.post('/register', Controller.createUser)
router.post('/login', Controller.login)
router.put('/login', Controller.loginLink)

module.exports = router


const express = require('express')
const doctorController = require('../controllers/doctorController')
const doctorRouter = express.Router()

// define the home page route
doctorRouter.post('/login', doctorController.login)


module.exports = doctorRouter
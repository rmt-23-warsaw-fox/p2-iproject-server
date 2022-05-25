const express = require('express');
const patientRouter = express.Router()
const PatientController = require('../controllers/patientController');
const authentication = require('../middlewares/authentication');
// define the home page route
patientRouter.post('/login', PatientController.login )
patientRouter.post('/register', PatientController.register)
patientRouter.post('/google', PatientController.googleAuth)

module.exports = patientRouter
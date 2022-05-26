const express = require('express');
const patientRouter = express.Router()
const PatientController = require('../controllers/patientController');
const authentication = require('../middlewares/authentication');
const errorHandler = require('../middlewares/error_handler');

// define the home page route
patientRouter.post('/login', PatientController.login )
patientRouter.post('/register', PatientController.register)
patientRouter.post('/google', PatientController.googleAuth)
patientRouter.use(authentication)
patientRouter.get('/read', PatientController.read)
patientRouter.post('/request', PatientController.request)
patientRouter.get('/myAppointments', PatientController.myAppointments)
patientRouter.use(errorHandler)
module.exports = patientRouter
const express = require('express');
const patientRouter = express.Router()
const PatientController = require('../controllers/patientController');
const authentication = require('../middlewares/authentication');
// define the home page route

module.exports = patientRouter
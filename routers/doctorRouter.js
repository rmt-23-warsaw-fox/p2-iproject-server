const express = require('express')
const doctorController = require('../controllers/doctorController')
const authentication = require('../middlewares/authentication')
const doctorRouter = express.Router()

// define the home page route
doctorRouter.post('/login', doctorController.login)
doctorRouter.use(authentication)
doctorRouter.get('/myAppointments', doctorController.myAppointments2)
doctorRouter.put('/approve/:approveId', doctorController.Approve)


module.exports = doctorRouter
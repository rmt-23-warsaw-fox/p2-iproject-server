const express = require('express')
const DestinationController = require('../controllers/destinationController')
const destinationRouter = express.Router()

destinationRouter.get('/', DestinationController.ShowAllDestinations)

module.exports = destinationRouter
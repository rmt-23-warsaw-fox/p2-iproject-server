const express = require('express')
const DestinationController = require('../controllers/destinationController')
const destinationRouter = express.Router()

destinationRouter.get('/', DestinationController.ShowAllDestinations)
destinationRouter.get('/:id', DestinationController.DestinationDetail)

module.exports = destinationRouter
'use strict'

const express = require('express')
const travelRoutes = express.Router()
const TravelController = require('../controllers/travelController')
const authN = require('../midleware/auth')

customerRoutes.get('/', TravelController.getTravel)
customerRoutes.get('/:id', TravelController.getTravelById)

customerRoutes.use(authN)
customerRoutes.get('/favorites', TravelController.getFavoriteDestination)
customerRoutes.post('/favorites/:id', TravelController.addFavoriteDestination)
customerRoutes.delete('/favorites/:id', TravelController.deleteFavoriteDestination)


module.exports = travelRoutes
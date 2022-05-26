'use strict'

const express = require('express')
const userRoutes = express.Router()
const UserController = require('../controllers/userController')
const TravelController = require('../controllers/travelController')
const authN = require('../midleware/auth')

userRoutes.post('/register', UserController.register)
userRoutes.post('/login', UserController.login)
userRoutes.post('/login-google', UserController.googleLogin)

userRoutes.get('/travels', TravelController.getTravel)
userRoutes.get('/travels/:id', TravelController.getTravelById)

userRoutes.use(authN)
userRoutes.get('/favorites', TravelController.getFavoriteDestination)
userRoutes.post('/favorites/:id', TravelController.addFavoriteDestination)
userRoutes.delete('/favorites/:id', TravelController.deleteFavoriteDestination)

module.exports = userRoutes
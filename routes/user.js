const express = require('express');
const routeUser = express.Router()
const ControllerUser = require('../controllers/controllerUser');

routeUser.post('/register', ControllerUser.register)
routeUser.post('/login', ControllerUser.login)

module.exports = routeUser
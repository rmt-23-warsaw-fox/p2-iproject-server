'use strict'

const express = require('express');
const routeAnime = express.Router()
const ControllerAnime = require('../controllers/controllerAnime');
const authentication = require('../middleware/authentication');

routeAnime.get('/recommendation', ControllerAnime.fetchRecom)
routeAnime.get('/detail/:id', ControllerAnime.detailAnime)

module.exports = routeAnime
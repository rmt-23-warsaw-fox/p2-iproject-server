const express = require('express')
const routes = express.Router()
const ControllerRadio = require('../controllers/controllerRadio')
const errorHandler = require('../helpers/errorHandler')

routes.get('/', ControllerRadio.getAllRadio)

routes.post('/songs', ControllerRadio.getSong)

routes.get('/songs/:id', ControllerRadio.getSongById)

routes.get('/:stationId', ControllerRadio.getRadioById)


routes.use((err, req, res, next) => {
  errorHandler(err, req, res, next)
})

module.exports = routes

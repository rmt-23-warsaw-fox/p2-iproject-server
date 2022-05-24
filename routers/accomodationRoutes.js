const accomodationRoutes = require("express").Router();
const AccomodationController = require('../controllers/accomodationController');

accomodationRoutes.post('/create-accomodation', AccomodationController.create)

module.exports = accomodationRoutes
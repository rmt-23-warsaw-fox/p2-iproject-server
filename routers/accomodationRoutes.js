const accomodationRoutes = require("express").Router();
const AccomodationController = require('../controllers/accomodationController');

accomodationRoutes.get("/", AccomodationController.fetchAllAccomodations)
accomodationRoutes.post('/create-accomodation', AccomodationController.create)

module.exports = accomodationRoutes
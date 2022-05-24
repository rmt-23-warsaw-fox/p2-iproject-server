const accomodationUserRoutes = require("express").Router();
const AccomodationUserController = require('../controllers/accomodationUserController');

accomodationUserRoutes.get("/", AccomodationUserController.fetchAllAccomodations)
accomodationUserRoutes.get("/accomodation-by-location", AccomodationUserController.fetchAccomodationByLocation)


module.exports = accomodationUserRoutes
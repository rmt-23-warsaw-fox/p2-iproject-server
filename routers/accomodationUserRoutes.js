const accomodationUserRoutes = require("express").Router();
const AccomodationUserController = require('../controllers/accomodationUserController');

accomodationUserRoutes.get("/", AccomodationUserController.fetchAllAccomodations)
accomodationUserRoutes.get("/search/:city", AccomodationUserController.fetchAccomodationByCity)
accomodationUserRoutes.get("/detail/:id", AccomodationUserController.fetchAccomodationById)

module.exports = accomodationUserRoutes
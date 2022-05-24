const accomodationUserRoutes = require("express").Router();
const AccomodationUserController = require('../controllers/accomodationUserController');

accomodationUserRoutes.get("/", AccomodationUserController.fetchAllAccomodations)

module.exports = accomodationUserRoutes
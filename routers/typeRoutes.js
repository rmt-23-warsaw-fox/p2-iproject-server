const typeRoutes = require("express").Router();
const TypeController = require('../controllers/typeController');

typeRoutes.get("/", TypeController.fetchTypes)

module.exports = typeRoutes
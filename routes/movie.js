const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controllerMovie");

router.get("/", Controller.home);

module.exports = router;

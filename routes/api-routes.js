const express = require("express");
const apiController = require("../controllers/apiController");
const router = express.Router();

router.get("/search", apiController.searchMovie)

module.exports = router;
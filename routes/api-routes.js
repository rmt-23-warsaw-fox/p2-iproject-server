const express = require("express");
const apiController = require("../controllers/apiController");
const router = express.Router();

router.get("/search", apiController.searchMovie)
router.get("/movie-detail/:MovieId", apiController.movieDetail)
router.get("/movie-trending", apiController.getTrending)

module.exports = router;
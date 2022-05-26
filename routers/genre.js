const express = require('express');
const GenreController = require('../controllers/genre')
const router = express.Router();

router.get('/', GenreController.getGenres);

module.exports = router
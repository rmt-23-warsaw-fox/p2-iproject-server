'use strict';

const express = require('express');
const router = express.Router();
const routeMovies = require('./movies');
const routeAnime = require('./anime');
const routeUser = require('./user');

router.use('/movie', routeMovies);
router.use('/anime', routeAnime)
router.use('/user', routeUser)

module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();
const routeMovies = require('./movies');

router.use('/movie', routeMovies);

module.exports = router;

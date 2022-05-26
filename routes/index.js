'use strict';

const express = require('express');
const router = express.Router();
const routeMovies = require('./movies');
const routeUser = require('./user');

router.use('/movie', routeMovies);
router.use('/user', routeUser)

module.exports = router;

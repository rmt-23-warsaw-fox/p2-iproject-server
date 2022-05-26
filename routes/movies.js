const express = require('express');
const routeMovies = express.Router();
const ControllerMovie = require('../controllers/controllerMovie');

routeMovies.get('/trending', ControllerMovie.trendingMovies);
routeMovies.get('/search', ControllerMovie.searchMovie);
routeMovies.get('/video/:id', ControllerMovie.getTrailer);
routeMovies.get('/detail/:id', ControllerMovie.movieDetail);

module.exports = routeMovies;

const express = require('express');
const routeMovies = express.Router();
const ControllerMovie = require('../controllers/controllerMovie');
const authentication = require('../middleware/authentication');

routeMovies.get('/popular', ControllerMovie.popularMovies)
routeMovies.get('/trending', ControllerMovie.trendingMovies);
routeMovies.get('/search', ControllerMovie.searchMovie);
routeMovies.get('/video/:id', ControllerMovie.getTrailer);
routeMovies.get('/detail/:id', ControllerMovie.movieDetail);
routeMovies.use(authentication)
routeMovies.post('/favorite/:id', ControllerMovie.addFavorite)
routeMovies.get('/favorite/:id', ControllerMovie.fetchFavorite)

module.exports = routeMovies;

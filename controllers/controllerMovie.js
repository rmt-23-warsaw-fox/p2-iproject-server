'use strict';

const axios = require('axios');
const { Favorite } = require('../models');

class ControllerMovie {
  static async popularMovies(req, res, next) {
    try {
      let { page = 1 } = req.query;

      const { data } = await axios({
        mehotd: 'GET',
        url: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=${page}`,
      });

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async trendingMovies(req, res, next) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`,
      });

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async movieDetail(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`,
      });

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async searchMovie(req, res, next) {
    try {
      const { query, page } = req.query;
      const { data } = await axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`,
      });

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getTrailer(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`,
      });

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async addFavorite(req, res, next) {
    try {
      const UserId = req.moreData.id;
      const MovieId = req.params.id;

      const find = await Favorite.findOne({
        where: {
          MovieId
        }
      });

      if (find) {
        throw new Error('DUPLICATE')
      }

      const newFav = await Favorite.create({
        MovieId,
        UserId
      });

      res.status(200).json(newFav)
    } catch (err) {
      next(err);
    }
  }

  static async fetchFavorite(req, res, next) {
    try {
      const UserId = req.moreData.id
      
      const favList = await Favorite.findAll({
        where: {
          UserId
        },
      })

      res.status(200).json(favList)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerMovie;

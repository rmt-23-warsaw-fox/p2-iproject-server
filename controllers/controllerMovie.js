"use strict";

const { Movie } = require("../models/index");

class Controller {
  static async home(req, res, next) {
    try {
      const allMovie = await Movie.findAll();
      console.log(allMovie);
      res.status(200).json({
        statusCode: 200,
        allMovie,
      });
    } catch (error) {
      //   console.log(error);
      next(error);
    }
  }
  static async detail(req, res, next) {
    try {
      const id = req.params.id;
      const searchMovies = await Movie.findByPk(id);
      if (searchMovies === null) {
        throw new Error("Not Found");
      }
      res.status(200).json({
        statusCode: 200,
        movies: searchMovies,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

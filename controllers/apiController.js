const axios = require("axios");

class apiController {
  static async searchMovie(req, res, next) {
    try {
      const api_key = process.env.API_KEY;
      const { query, page } = req.query;

      if (!page) {
        page = 1;
      }

      const { data } = await axios({
        method: "get",
        url: `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}`,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async movieDetail(req, res, next) {
    try {
      const { MovieId } = req.params;
      const api_key = process.env.API_KEY;

      const { data } = await axios({
        method: "get",
        url: `https://api.themoviedb.org/3/movie/${MovieId}?api_key=${api_key}`,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getTrending(req, res, next) {
    try {
      const api_key = process.env.API_KEY;
      const { page } = req.query;

      const { data } = await axios({
        method: "get",
        url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}&page=${page}`,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = apiController;

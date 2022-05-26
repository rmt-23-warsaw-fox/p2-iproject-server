const axios = require("axios");

class apiController {
  static async searchMovie(req, res, next) {
    try {
      const api_key = "8cfeb5ca09af2ee8c4cec15101a61248";
      const { query } = req.query;

      const { data } = await axios({
        method: "get",
        url: `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`,
      });

      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async movieDetail(req, res, next) {
    try {
      
    } catch (error) {
      res.status(500).json(error);
    }
  };
}

module.exports = apiController;

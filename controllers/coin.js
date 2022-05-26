const axios = require("axios");
const { Bookmark } = require('../models/index.js')
class Controller {
  static async getCoin(req, res, next) {
    const options = {
      method: "GET",
      url: "https://investing-cryptocurrency-markets.p.rapidapi.com/coins/list",
      params: {
        edition_currency_id: "12",
        time_utc_offset: "28800",
        lang_ID: "1",
        sort: "PERC1D_DN",
        page: "1",
      },
      headers: {
        "X-RapidAPI-Host": "investing-cryptocurrency-markets.p.rapidapi.com",
        "X-RapidAPI-Key": "52a4a46acbmsh27697a967765ae5p1f872djsn8dfec0d78946",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        res.status(200).json(response.data.data[0].screen_data.crypto_data);
      })
      .catch(function (err) {
        next(err)
      });
  }


  static async getNews(req, res, next) {
    const options = {
      method: 'GET',
      url: 'https://crypto-news-live3.p.rapidapi.com/news/cryptonews.com',
      headers: {
        'X-RapidAPI-Host': 'crypto-news-live3.p.rapidapi.com',
        'X-RapidAPI-Key': '52a4a46acbmsh27697a967765ae5p1f872djsn8dfec0d78946'
      }
    };
    
    axios.request(options).then(function (response) {
      res.status(200).json(response.data)
    }).catch(function (err) {
      next(err)
    });
  }


  

}

module.exports = Controller;

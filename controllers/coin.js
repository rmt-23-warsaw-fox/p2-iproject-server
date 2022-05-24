const axios = require("axios");

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
        res.status(200).json(response.data.data[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  static async searchCoin(req, res, next) {

    const coinName = req.query.name
    const options = {
        method: 'GET',
        url: 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins/list-pairs',
        params: {time_utc_offset: '28800', lang_ID: '1'},
        headers: {
          'X-RapidAPI-Host': 'investing-cryptocurrency-markets.p.rapidapi.com',
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

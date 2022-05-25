const axios = require("axios")

class Controller{
  static async getCoins(req, res, next) {
    try {
      const {page = 1} = req.body
      let response = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`
      }) 
  
      res.status(200).json(response.data)
    } catch (error) {
      next(error)
    }
  }

  static async coinDetail(req, res, next) {
    try {
      const {coin} = req.body
      let response = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      }) 
      
      res.status(200).json(response.data)
    } catch (error) {
      next(error)
    }
  }

  static async coinHistory(req, res, next) {
    try {
      const {coin, date = 1} = req.body
      let response = await axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${date}`
      }) 
  
      let prices = response.data.prices.map(price => {
        return price
      })
  
      res.status(200).json(prices)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller
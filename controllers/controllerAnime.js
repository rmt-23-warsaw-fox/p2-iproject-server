'use strict'

const axios = require("axios")

class ControllerAnime {
  static async fetchRecom(req, res, next) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `https://api.jikan.moe/v4/anime/1/recommendations`
      })

      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
  
  static async detailAnime(req, res, next) {
    try {
      const id = req.params.id
      const { data } = await axios({
        method: 'GET',
        url: `https://api.jikan.moe/v4/anime/${id}`
      })

      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerAnime
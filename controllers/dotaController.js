"use strict"
const axios = require("axios")
const { Hero } = require("../models")

class DotaController {
  static async getMatches(req, res, next) {
    try {
      const id = req.userData.dotaId
      const heroesId = []
      const { data } = await axios({
        method: "get",
        url: `https://api.opendota.com/api/players/${id}/recentMatches`,
      })
      data.forEach((el) => heroesId.push(el.hero_id))

      for (let i = 0; i < heroesId.length; i++) {
        const hero = await Hero.findOne({ where: { id: heroesId[i] } })
        data[i].hero = hero
      }

      res.status(200).json({
        statusCode: 200,
        data,
      })
    } catch (err) {
      next(err)
    }
  }

  static async getTeams(req, res, next) {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://api.opendota.com/api/teams",
      })
      res.status(200).json({
        statusCode: 200,
        data,
      })
    } catch (err) {
      next(err)
    }
  }

  static async getTeam(req, res, next) {
    try {
      const { teamId } = req.params
      const { data } = await axios({
        method: "get",
        url: `https://api.opendota.com/api/teams/${teamId}`,
      })
      if (!data) throw new Error("not found")
      res.status(200).json({
        statusCode: 200,
        data,
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = DotaController

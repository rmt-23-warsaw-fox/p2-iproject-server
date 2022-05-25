"use strict"
const axios = require("axios")
const { Hero } = require("../models")

class DotaController {
  static async getMatches(req, res, next) {
    try {
      const id = req.userData.dotaId
      const heroesId = []
      const heroes = []
      const { data } = await axios({
        method: "get",
        url: `https://api.opendota.com/api/players/${id}/recentMatches`,
      })
      data.forEach((el) => heroesId.push(el.hero_id))

      for (let i = 0; i < heroesId.length; i++) {
        const hero = await Hero.findOne({ where: { id: heroesId[i] } })
        heroes.push(hero)
        console.log(hero.localized_name, hero.id, data[i].hero_id)
      }
      // console.log(heroes, "<<<<<<<")
      // console.log(heroesId)
      res.status(200).json({
        statusCode: 200,
        heroes,
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = DotaController

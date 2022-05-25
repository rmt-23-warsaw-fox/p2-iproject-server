
const ValorantAPI = require("unofficial-valorant-api")

class ValoController {
  static async getMatches(req,res,next){
    try {
      const {puuid} = req.extra
      const { mode,map } = req.query
      const matches = await ValorantAPI.getMatchesByPUUID('ap',puuid,'1',mode,map)

      res.status(200).json(matches)
    } catch (err) {
      next(err)
    }
  }

  static async matchbyid(req,res,next){
    try {
      
    } catch (err) {
      
    }
  }

  static async myProfile(req,res,next){
    try {
      const {ign,tagline} = req.extra
      console.log(ign,tagline)
      const {data} = await ValorantAPI.getAccount(ign,tagline)

      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

}

module.exports = ValoController
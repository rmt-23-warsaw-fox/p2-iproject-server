
const ValorantAPI = require("unofficial-valorant-api")

class ValoController {
  static async getMatches(req,res,next){
    try {
      const {puuid} = req.extra
      const { mode,map } = req.query
      const {data} = await ValorantAPI.getMatchesByPUUID('ap',puuid,'1',mode,map)
      const metadata = data[0].metadata
      const myData = data[0].players.all_players.find(el=>{
        if(el.puuid === puuid) {
          return el
        }
      })

      const myStats = {
        puuid : myData.puuid,
        name : myData.name,
        tag : myData.tag,
        imageUrl : myData.assets.agent.bust,
        myStat : myData.stats
      }

      const redTeam = data[0].players.red.map(el=>{
        const player = {
          name : el.name,
          tag : el.tag,
          photo : el.assets.agent.small
        }
        return player
      })
      const blueTeam = data[0].players.blue.map(el=>{
        const player = {
          name : el.name,
          tag : el.tag,
          photo : el.assets.agent.small
        }
        return player
      })

      res.status(200).json({
        headerData : {
          metadata,
          myStats
        },
        teamData : {
          redTeam,
          blueTeam
        }
      })
      
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
      const small = data.card.small
      const wide = data.card.wide
      const myProfile = {
        puuid : data.puuid,
        name : data.name,
        tag : data.tag,
        accountLevel : data.account_level,
        smallImage : small,
        wideImage : wide
      }
      console.log(data.card.small)
        res.status(200).json(myProfile)
    } catch (err) {
      next(err)
    }
  }

}

module.exports = ValoController
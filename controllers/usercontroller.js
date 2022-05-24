const {User} = require('../models')
const ValorantAPI = require("unofficial-valorant-api")

class UserController {
  static async register(req,res,next) {
    try {
      const {username,email,password,ign,tagline} = req.body

      if (!ign) {
        throw new Error("ign_required")
      }
      
      if(!tagline) {
        throw new Error("tagline_required")
      }

      const {data} = await ValorantAPI.getAccount(ign,tagline)

      if(!data.puuid) {
        throw new Error("valo_account_not_found")
      }

      const puuid = data.puuid

      const newUser = await User.create({username,email,password,puuid})

      res.status(201).json({
        id : newUser.id,
        username : newUser.username,
        puuid : newUser.puuid
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req,res,next) {
    try {
      
    } catch (err) {
      
    }
  }

  static async googleLogin(req,res,next) {
    try {
      
    } catch (err) {
      
    }
  }
}

module.exports = UserController
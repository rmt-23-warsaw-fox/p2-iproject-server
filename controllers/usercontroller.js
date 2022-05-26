const {User} = require('../models')
const ValorantAPI = require("unofficial-valorant-api")
const { checkpw, createToken } = require('../helpers')
const {OAuth2Client} = require('google-auth-library');
const clientIdSecret = "473049766696-janch2m30tgkusvioiagoh2b6m5gajo7.apps.googleusercontent.com"
class UserController {
  static async register(req,res,next) {
    try {
      console.log(req.body)
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

      const newUser = await User.create({username,email,password,puuid,tagline,ign})

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
      const {username,password} = req.body

      if(!username) {
        throw new Error("Please input your Username")
      }
      
      if(!password) {
        throw new Error("Please input your Password")
      }
      
      const user = await User.findOne({
        where : {
          username : username
        }
      })

      if(!user){
        throw new Error("Invalid username/password")
      }

      const isValidPassword = checkpw(password,user.password)

      if(!isValidPassword) {
        throw new Error("Invalid username/password")
      }

      const payload = {
        id : user.id,
        puuid : user.puuid
      }

      const token = createToken(payload)

      res.status(200).json({
        access_token : token
      })
    } catch (err) {
      next(err)
    }
  }

  static async googleLogin(req,res,next) {
    try {
      console.log(req.body.tagline)
      const { token,tagline,ign } = req.body
      const {data} = await ValorantAPI.getAccount(ign,tagline)

      if(!data.puuid) {
        throw new Error("valo_account_not_found")
      }

      const puuid = DATA.PUUID
      const clientId = clientIdSecret
      const client = new OAuth2Client(clientId)
      const ticket = await client.verifyIdToken({
        idToken : token,
        audience : clientId,
      })
      const payloadGoogle = ticket.getPayload()
      console.log(payloadGoogle)
      const random = Math.random().toString(36).substring(2,7)
      const [user, created] = await User.findOrCreate({
        where : {
          email : payloadGoogle.email
        },
        defaults : {
          username : payloadGoogle.name,
          password : random+"asd",
          ign : ign,
          tagline:tagline,
          puuid : puuid
        }
      })

      const payload = {
        id : user.id,
        username : user.username
      }
      const access_token = createToken(payload)

      res.status(200).json({
        message : "login succes",
        access_token : access_token,
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = UserController
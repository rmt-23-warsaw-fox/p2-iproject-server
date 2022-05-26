const { readToken } = require("../helpers")
const { User } = require('../models')


const authentication = async (req,res,next) => {
  try {
    const {access_token} = req.headers
    const payload = readToken(access_token)
    const {puuid} = payload
    console.log(payload)
    const user = await User.findOne({
      where : {
        puuid : puuid
      }
    })

    if(!user){
      throw new Error("user_not_found")
    }
    
    req.extra = {
      id : user.id,
      puuid : user.puuid,
      ign : user.ign,
      tagline : user.tagline 
    }
    next()
  } catch (err) {
    next(err)
  }
}


module.exports = {
  authentication
}
const { readToken } = require("../helpers")
const { User } = require('../models')


const authentication = async (req,res,next) => {
  try {
    const {access_token} = req.headers
    const payload = readToken(access_token)
    const {puuid} = payload

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
      puuid : user.puuid
    }
  } catch (err) {
    next(err)
  }
}


module.exports = {
  authentication
}
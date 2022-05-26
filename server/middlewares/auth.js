const { decodeToken } = require('../helpers/jwt')
const { Organizer, Participant } = require('../models')

const organizerAuth = async (req, res, next) => {
  try {
    const access_token = req.headers.access_token


    if(!access_token){
      throw new Error('Unauthorized')
    }

    const payload = decodeToken(access_token)

    if(!payload){
      throw new Error('Invalid token')
    }

    const foundOrganizer = await Organizer.findOne({
      where:{
        email:payload.email
      }
    })

    if(!foundOrganizer){
      throw new Error('Unauthorized')
    }

    req.UserInfo = {
      id:foundOrganizer.id
    }

    next()
  } catch (error) {
    next(error)
  }
}

const participantAuth = async(req, res, next) => {
  try {
    const access_token = req.headers.access_token

    if(!access_token){
      throw new Error('Unauthorized')
    }

    const payload = decodeToken(access_token)

    if(!payload){
      throw new Error('Invalid token')
    }

    const foundParticipant = await Participant.findOne({
      where:{
        email:payload.email
      }
    })

    if(!foundParticipant){
      throw new Error('Unauthorized')
    }

    req.UserInfo = {
      id:foundParticipant.id
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  organizerAuth,
  participantAuth
}
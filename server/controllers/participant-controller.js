const { createToken } = require('../helpers/jwt')
const { comparing } = require('../helpers/bcrypt')
const { Participant } = require('../models')

class Controller{
  static async participantRegister(req, res, next){
    try {
      const { name, email, password } = req.body
  
      const newParticipant = await Participant.create({
        name, 
        email,
        password
      })
  
      res.status(201).json({
        id:newParticipant.id,
        name:newParticipant.name,
        email:newParticipant.email
      })
    } catch (error) {
      next(error)
    }
  }

  static async participantLogin(req, res, next){
    try {
      const { email, password } = req.body
  
      if(!email || !password){
        throw new Error('Invalid email/password')
      }
  
      const foundParticipant = await Participant.findOne({
        where:{
          email
        }
      })
  
      if(!foundParticipant){
        throw new Error('Invalid email/password')
      }
      
      if(!comparing(password, foundParticipant.password)){
        throw new Error('Invalid email/password')
      }
  
      const payload = {
        id:foundParticipant.id,
        email:foundParticipant.email
      }
  
      const access_token = createToken(payload)
  
      res.status(200).json({
        id:foundParticipant.id,
        name:foundParticipant.name,
        email:foundParticipant.email,
        access_token
      })
    } catch (error) {
      next(error)
    }
  }

  static async participantJoinEvent (req, res, next) {
    try {
      const id = +req.UserInfo.id
      const eventId = +req.params.id
      const joined = await Participant.update({eventId},{
        where:{
          id
        }
      })
  
      if(joined[0] === 0){
        throw new Error('Not found')
      }
  
      res.status(200).json({
        message:"Successfully joined to event "+eventId
      })
    } catch (error) {
      next(error)
    }
  }

  static async getParticipantByEventId(req, res, next){
    try {
      const OrganizerId = +req.UserInfo.id
      const joinedParticipants = await Participant.findAll({
        where:{
          eventId:OrganizerId
        }, attributes:{
          exclude:['createdAt', 'updatedAt', 'password']
        }
      })
  
      res.status(200).json(joinedParticipants)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller
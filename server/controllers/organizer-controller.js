const { createToken } = require('../helpers/jwt')
const { comparing } = require('../helpers/bcrypt')
const { Organizer } = require('../models')

class Controller{
  static async organizerRegister(req, res, next){
    try {
      const { name, email, password } = req.body
      const newOrganizer = await Organizer.create({
        name, 
        email,
        password
      })
  
      res.status(201).json({
        id:newOrganizer.id,
        name:newOrganizer.name,
        email:newOrganizer.email
      })
    } catch (error) {
      next(error)
    }
  }

  static async organizerLogin(req, res, next){
    try {
      const { email, password } = req.body
  
      if(!email || !password){
        throw new Error('Invalid email/password')
      }
  
      const foundOrganizer = await Organizer.findOne({
        where:{
          email
        }
      })
  
      if(!foundOrganizer){
        throw new Error('Invalid email/password')
      }
      
      if(!comparing(password, foundOrganizer.password)){
        throw new Error('Invalid email/password')
      }
  
      const payload = {
        id:foundOrganizer.id,
        email:foundOrganizer.email
      }
  
      const access_token = createToken(payload)
  
      res.status(200).json({
        id:foundOrganizer.id,
        name:foundOrganizer.name,
        email:foundOrganizer.email,
        access_token
      })
    } catch (error) {
      next(error)
    }
  }

  static async getAllOrganizers (req, res, next) {
    try {
      const allOrganizers = await Organizer.findAll()
      res.status(200).json(allOrganizers)
    } catch (error) {
      next(error)
    }
  }

}

module.exports = Controller
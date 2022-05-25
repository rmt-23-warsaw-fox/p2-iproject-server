const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const cors = require('cors')

const { Organizer, Participant } = require('./models')
const { comparing } = require('./helpers/bcrypt')
const { createToken, decodeToken } = require('./helpers/jwt')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post('/organizers/register', async(req, res, next) => {
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
})

app.post('/organizers/login', async(req, res, next) => {
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
})

app.post('/participants/register', async(req, res, next) => {
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
})

app.post('/participants/login', async(req, res, next) => {
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
})

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

app.get('/organizers', async  (req, res, next) => {
  try {
    const allOrganizers = await Organizer.findAll()
    res.status(200).json(allOrganizers)
  } catch (error) {
    next(error)
  }
})

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

app.put('/participants/join/:id', participantAuth, async (req, res, next) => {
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
})

app.get('/participants', organizerAuth, async(req, res, next) => {
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
})


app.use((error, req, res, next) => {
  let code = 500
  let message = "Internal server error"

  if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError"){
    code = 400
    message = error.errors[0].message
  }

  if(error.message === "Invalid email/password"){
    code = 401
    message = error.message
  }

  if(error.message === "Invalid token" || error.name === "JsonWebTokenError"){
    code = 403
    message = "Invalid token"
  }

  if(error.message === "Unauthorized"){
    code = 403
    message = error.message
  }

  if(error.message === "Not found"){
    code = 404
    message = error.message
  }

  res.status(code).json({
    error:message
  })
})



app.listen(PORT, ()=>console.log('http://localhost:' + PORT))
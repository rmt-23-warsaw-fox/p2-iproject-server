const express = require('express')
const router = express.Router()
const { User } = require('../models/index')
const { createHash, compareHash } = require('../helpers/bcrypt')
const { createToken, decodeToken } = require('../helpers/jwt')
const postRoutes = require('./post')
const likeRouter = require('./like')
const { Op } = require("sequelize");

router.post('/register', async (request, response, next) => {
  try {
    const {username, email, password, genre, bio} = request.body

    let hashPassword = ""
    if (password !== null || password !== "") {
      hashPassword = createHash(password)
    }

    await User.create({
      username,
      email,
      password: hashPassword,
      bio,
      genre
    })

    response.status(201).json({
      message: "Register is successfully"
    })
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (request, response, next) => {
  try {
    const { email, password } = request.body

    const foundUser = await User.findOne({
      where: {
        email
      }
    })

    if (foundUser === null) {
      throw new Error('unauthorized')
    }

    let isValidPassword = compareHash(password, foundUser.password)

    if (isValidPassword === false) {
      throw new Error('unauthorized')
    }

    let payload = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email
    }

    let access_token = createToken(payload)

    response.status(200).json({
      access_token,
      payload
    })
  } catch (err) {
    next(err)
  }
})

router.post('/users', async (request, response, next) => {
  try {
    const id = request.body.id

    console.log(id);

    const users = await User.findAll({
      where: {
        id: {
          [Op.ne]: +id
        }
      }
    })

    response.status(200).json({
      users
    })
  } catch (err) {
    next(err)
  }
})

router.get('/users/:id', async (request, response, next) => {
  try {
    const {id} = request.params

    const foundUser = await User.findOne({
      where: {
        id: +id
      },
      attributes: { exclude: ['password'] }
    })

    if(foundUser === null) {
      throw new Error('user_not_found')
    }

    response.status(200).json({
      user: foundUser
    })
  } catch (err) {
    next(err)
  }
})

router.use('/posts', postRoutes)
router.use('/likes', likeRouter)

module.exports = router
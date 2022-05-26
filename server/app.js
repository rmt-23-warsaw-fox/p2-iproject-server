const express = require('express')
const cors = require('cors')
const app = express()
const { User } = require('./models/index')
const { compareHash } = require('./helpers/bcrypt')
const { createToken, decodeToken } = require('./helpers/jwt')
const {auth} = require('./middlewares/authentication.js')
const axios = require("axios");
const { Op } = require("sequelize");

const port = 3000

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.post('/login', async (request, response, next) => {
  try {
    const { email, password } = request.body
    console.log(email, password);

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

app.post('/users', async (request, response, next) => {
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

app.get('/users/:id', async (request, response, next) => {
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

app.use(auth)

app.get('/memes', (request, response) => {
  const options = {
    method: 'GET',
    url: 'https://programming-memes-images.p.rapidapi.com/v1/memes',
    headers: {
      'X-RapidAPI-Host': 'programming-memes-images.p.rapidapi.com',
      'X-RapidAPI-Key': 'f6921824a3msh0f20574e869bd8bp1cd505jsn7289a82fe4c3'
    }
  };

  axios.request(options).then(function (res) {
    response.status(200).json({
      memes: res.data
    })
  }).catch(function (error) {
    console.error(error);
  });
})

app.use((err, request, response, next) => {
  let status = 500
  let message = 'Internal Server Error'

  if (err.message === 'unauthorized') {
    status = 401
    message = 'Email or password is invalid.'
  } else if (err.message === 'user_not_found') {
    status = 404
    message = 'User is not found'
  }

  response.status(status).json({
    message
  })
})

app.listen(port, () => {
  console.log('Listening on port :', port);
})
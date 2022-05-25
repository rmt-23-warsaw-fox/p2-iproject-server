const express = require('express')
const cors = require('cors')
const app = express()
const {User} = require('./models/index')
const {compareHash} = require('./helpers/bcrypt')

const port = 3000

app.use(express.urlencoded({extended:false}));
app.use(cors())

app.get('/', (request, response) => {
  response.send('hallo')
})

app.post('/login', async (request, response, next) => {
  try {
    const {email, password} = request.body

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
   
    let access_token = ''

  } catch (err) {
    next(err)
  }
})

app.use((err, request, response, next) => {
  let status = 500
  let message = 'Internal Server Error'

  if (err.message === 'unauthorized') {
    status = 401
    message = 'Email or password is invalid.'
  }

  response.status(status).json({
    message
  })
})

app.listen(port, () => {
  console.log('Listening on port :', port);
})
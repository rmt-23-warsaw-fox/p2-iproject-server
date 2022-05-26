if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const { User } = require('./models/index')
const { compareHash } = require('./helpers/bcrypt')
const { createToken, decodeToken } = require('./helpers/jwt')
const {errorHandling} = require('./middlewares/errorHandler')
const {PostController} = require('./controllers/postController.js')
const axios = require("axios");
const { Op } = require("sequelize");
const routes = require('./routes/index.js')



const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.use(routes)

// app.use(auth)



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

app.use(errorHandling)

app.listen(port, () => {
  console.log('Listening on port :', port);
})
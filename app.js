'use strict'

require('dotenv').config()
const cors = require('cors')
const express = require('express')
const router = require('./routers/index')
const errorHandler = require('./midleware/errorHandler')
const app = express()
const port = process.env.PORT || 3000
// const passport = require('passport')
// const FacebookStrategy = require('passport-facebook');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', router)
app.use(errorHandler)

// passport.use(new FacebookStrategy({
//   clientID: process.env.CLIENT_ID_FB,
//   clientSecret: process.env.CLIENT_SECRET_FB,
//   callbackURL: "http://localhost:5500/auth/facebook/secrets"
// },
//   function (accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

// app.get('/auth/facebook',
//   passport.authenticate('facebook'));

// app.get('/auth/facebook/secrets',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });


app.get('/', (req, res) => {
  res.send('Hello Brooooo')
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})


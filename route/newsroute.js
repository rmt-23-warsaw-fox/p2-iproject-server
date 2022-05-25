"use strict";
const express = require('express')
const news = express.Router()
const Controller = require('../controller/controller')
const Authentication = require('../middleware/Authentication')


news.post("/login", Controller.login)
news.post("/register", Controller.register)
news.get("/", Controller.HomeNews)
news.use(Authentication)
news.get("/favoritesNews", Controller.Favorite)
module.exports = news
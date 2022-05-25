"use strict";
const express = require('express')
const news = express.Router()
const Controller = require('../controller/controller')
const Authentication = require('../middleware/Authentication')


news.post("/login", Controller.login)
news.post("/register", Controller.register)

news.get("/", Controller.HomeNews)
news.get("/categories", Controller.CategoriesNews)
news.get("/weather", Controller.WeatherMap)

news.use(Authentication)
news.get("/favoritesNews", Controller.Favorite)
news.post("/favoritesNews", Controller.AddFavorites)

module.exports = news
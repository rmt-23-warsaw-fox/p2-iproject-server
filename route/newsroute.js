"use strict";
const express = require('express')
const news = express.Router()
const Controller = require('../controller/controller')
const Authentication = require('../middleware/Authentication')


news.post("/login", Controller.login)
news.post("/register", Controller.register)
news.use(Authentication)
news.get("/", Controller.HomeNews)
module.exports = news
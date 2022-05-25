"use strict";
const express = require('express')
const news = express.Router()
const Controller = require('../controller/controller')

news.post("/login", Controller.login)



news.get("/", Controller.HomeNews)
module.exports = news
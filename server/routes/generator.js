const express = require('express')
const Controller = require('../controllers/generator-controller')
const router = express.Router()

router.get('/jokes', Controller.getRandomJoke)

module.exports = router
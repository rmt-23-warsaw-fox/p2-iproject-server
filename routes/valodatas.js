const express = require('express')
const router = express.Router()
const ValoController = require('../controllers/valodatasController')

router.get('/matches',ValoController.getMatches)


module.exports = router
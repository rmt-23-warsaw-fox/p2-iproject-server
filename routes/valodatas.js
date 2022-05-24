const express = require('express')
const router = express.Router()
const ValoController = require('../controllers/valodatasController')

router.post('/matches',ValoController.getMatches)


module.exports = router
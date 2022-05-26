const express = require('express')
const router = express.Router()
const ValoController = require('../controllers/valodatascontroller')
const {authentication} = require('../middlewares/auth')



router.get('/profile',authentication,ValoController.myProfile)
router.get('/matches',authentication, ValoController.getMatches)


module.exports = router
const express = require('express')
const Controller = require('../controllers/organizer-controller')
const router = express.Router()

router.post('/register', Controller.organizerRegister)
router.post('/login', Controller.organizerLogin)

router.get('/', Controller.getAllOrganizers)



module.exports = router
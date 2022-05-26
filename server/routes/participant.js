const express = require('express')
const Controller = require('../controllers/participant-controller')
const router = express.Router()
const { participantAuth, organizerAuth } = require('../middlewares/auth')

router.post('/register', Controller.participantRegister)

router.post('/login', Controller.participantLogin )

router.put('/join/:id', participantAuth, Controller.participantJoinEvent)

router.get('/', organizerAuth, Controller.getParticipantByEventId )

module.exports = router
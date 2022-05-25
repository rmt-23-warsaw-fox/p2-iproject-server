const express = require('express')
const router = express.Router()
const organizer = require('./organizer')
const participant = require('./participant')

router.use('/organizers', organizer)
router.use('/participants', participant)

module.exports = router
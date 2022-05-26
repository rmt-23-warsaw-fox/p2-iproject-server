const express = require('express')
const router = express.Router()
const organizer = require('./organizer')
const participant = require('./participant')
const generator =  require('./generator')

router.use('/organizers', organizer)
router.use('/participants', participant)
router.use('/generators', generator)

module.exports = router
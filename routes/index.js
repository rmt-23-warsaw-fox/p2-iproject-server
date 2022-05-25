const express = require('express')
const router = express.Router()
const destinationRouter = require('./destination')

router.use('/destination', destinationRouter)

module.exports = router
const express = require('express')
const router = express.Router()
const destinationRouter = require('./destination')
const orderRouter = require('./order')


router.use('/', orderRouter)
router.use('/destination', destinationRouter)

module.exports = router
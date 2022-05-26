const express = require('express')
const router = express.Router()
const destinationRouter = require('./destination')
const orderRouter = require('./order')


router.use('/destination', destinationRouter)
router.use('/order', orderRouter)

module.exports = router
const express = require('express')
const router = express.Router()
const usersRouter = require('./users')

router.use('/users', usersRouter)
router.use('/valodatas',valodatasRouter)
module.exports = router

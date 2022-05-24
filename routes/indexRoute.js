const express = require("express");
const router = express.Router()
const package = require('./packagesRoute')
const users = require('./usersRoute')

router.use('/packages', package)
router.use('/users', users)

module.exports = router
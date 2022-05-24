const express = require("express");
const router = express.Router()
const users = require('./userRoute')
const authentication = require('../middlewares/authen')


router.use('/users', users)

router.use(authentication)

module.exports = router
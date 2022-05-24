const express = require("express");
const router = express.Router()
const users = require('./userRoute')
const products = require('./products')
const login = require('./login')
const authentication = require('../middlewares/authen')


router.use('/users', users)
router.use('/products', products)

router.use(authentication)
router.use('/login', login)

module.exports = router
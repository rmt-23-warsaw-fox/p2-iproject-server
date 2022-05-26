const express = require('express')
const OrderController = require('../controllers/orderController')
const orderRouter = express.Router()

orderRouter.post('/', OrderController.order)

module.exports = orderRouter
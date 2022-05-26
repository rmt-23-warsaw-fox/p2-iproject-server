const express = require('express')
const OrderController = require('../controllers/orderController')
const orderRouter = express.Router()

orderRouter.post('/', OrderController.order)
orderRouter.post('/:id', OrderController.createOrder)

module.exports = orderRouter
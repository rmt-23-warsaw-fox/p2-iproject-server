const express = require('express')
const OrderController = require('../controllers/orderController')
const orderRouter = express.Router()

orderRouter.post('/', OrderController.order)
orderRouter.post('/:id', OrderController.createOrder)
orderRouter.patch('/:id', OrderController.UpdateOrder)

module.exports = orderRouter
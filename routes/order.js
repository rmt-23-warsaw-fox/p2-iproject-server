const express = require('express')
const OrderController = require('../controllers/orderController')
const orderRouter = express.Router()

orderRouter.post('/destination/:id/snap', OrderController.order)
orderRouter.patch('/destination/:id/order', OrderController.UpdateOrder)

module.exports = orderRouter
const midtransClient = require('midtrans-client');
const { Order, Destination } = require('../models')
const { sendEmail } = require('../helpers/nodemailer')

class OrderController {
    static async order(req, res, next) {
        try {
            const id = +req.params.id
            const { fullName, email, phone, date, amountOfPeople } = req.body
            const findDestination = await Destination.findByPk(id)

            const objMail = {
                fullName,
                email,
                amountOfPeople,
                date,
                destinasi: findDestination.name
            }

            const newOrder = await Order.create({
                fullName,
                email,
                phone,
                date,
                amountOfPeople,
                DestinationId: id,
                status: "unpaid"
            })

            if (!newOrder) {
                throw new Error('Order not created')
            }

            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.serverKey,
                clientKey: process.env.clientKey
            });

            let parameter = {
                "transaction_details": {
                    "order_id": `orderDream-${Date.now()}`,
                    "gross_amount": `${findDestination.price * amountOfPeople}`
                },
            };

            let order = await snap.createTransaction(parameter)

            if (!order) {
                throw new Error("Order failed")
            }

            order.orderIDBE = newOrder.id
            sendEmail(objMail)
            res.status(200).json(order)
        } catch (err) {
            next(err)
        }
    }

    static async UpdateOrder(req, res, next) {
        try {
            const orderId = +req.params.id
            const updatedOrder = await Order.update({
                status: "paid",
            }, {
                where: {
                    id: orderId
                }
            })

            if (!updatedOrder) {
                throw new Error(`Order not found`)
            }
            res.status(200).json({
                statusCode: 200,
                data: updatedOrder,
                message: `Order paid`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = OrderController
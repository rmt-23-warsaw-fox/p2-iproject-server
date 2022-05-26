const midtransClient = require('midtrans-client');
const { Order, Destination } = require('../models')

class OrderController {
    static async order(req, res, next) {
        try {
            const id = +req.params.id
            const { fullName, email, phone, date, amountOfPeople } = req.body

            const findDestination = await Destination.findByPk(id)

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
                throw new Error('order not created')
            }

            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: 'SB-Mid-server-B892m0AJFL0ueMF_84gqAW-u',
                clientKey: 'SB-Mid-client-ACE2fDAk9G_Scio9'
            });

            let parameter = {
                "transaction_details": {
                    "order_id": `orderDream-${Date.now()}`,
                    "gross_amount": `${findDestination.price * amountOfPeople}`
                }, "credit_card": {
                    "secure": true
                }
            };

            const order = await snap.createTransaction(parameter)

            if (!order) {
                throw new Error("Order failed")
            }

            res.status(200).json(order)
        } catch (err) {
            console.log(err)
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

            res.status(200).json({
                statusCode: 200,
                data: updatedOrder,
                message: `Order paid`
            })
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = OrderController
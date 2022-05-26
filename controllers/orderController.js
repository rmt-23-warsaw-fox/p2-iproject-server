const midtransClient = require('midtrans-client');
const { Order } = require('../models')

class OrderController {

    static async createOrder(req, res, next) {
        try {
            const DestinationId = +req.params.id
            const { fullName, email, phone, date, amountOfPeople } = req.body

            const newOrder = await Order.create({
                fullName,
                email,
                phone,
                date,
                amountOfPeople,
                DestinationId,
                status: "unpaid"
            })

            console.log(newOrder)

            res.status(201).json(newOrder)
        } catch (err) {
            console.log(err)
        }
    }


    static async order(req, res, next) {
        try {
            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: 'SB-Mid-server-B892m0AJFL0ueMF_84gqAW-u',
                clientKey: 'SB-Mid-client-ACE2fDAk9G_Scio9'
            });

            let parameter = {
                "transaction_details": {
                    "order_id": `orderDream-${Date.now()}`,
                    "gross_amount": 200000
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
}

module.exports = OrderController
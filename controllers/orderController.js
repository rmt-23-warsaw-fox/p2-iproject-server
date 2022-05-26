const midtransClient = require('midtrans-client');

class OrderController {
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

            console.log(order)
            let transactionToken = order.token;
            console.log('transactionToken:', transactionToken);

            res.status(200).json(order)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = OrderController
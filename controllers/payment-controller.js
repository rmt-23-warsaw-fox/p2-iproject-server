const axios = require("axios");
const snap = require("../axios/midtrans");

class Controller {
  static async createPayment(req, res, next) {
    try {
      const dateId = new Date().toJSON().slice(0, 10).replace(/-/g, "");
      const orderId = `${dateId}${Math.floor(Math.random() * 10000)}`;

      let parameter = {
        transaction_details: {
          order_id: `iProject-${orderId}`,
          gross_amount: req.body.price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: "user",
          last_name: "dummy",
          email: req.user.email,
          phone: "78111222333",
        },
      };

      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;
      let transactionRedirectUrl = transaction.redirect_url;

      res.status(201).json({
        message: "Payment created successfully",
        token: transactionToken,
        redirect_url: transactionRedirectUrl,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;

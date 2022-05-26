const snap = require("../axios/midtrans");
const { TransactionHistory } = require("../models");

class Controller {
  static async createPayment(req, res, next) {
    try {
      const { firstName, lastName, email, phone, priceTotal } = req.body;

      const dateId = new Date().toJSON().slice(0, 10).replace(/-/g, "");
      const orderId = `iProject-${dateId}${Math.floor(Math.random() * 10000)}`;

      let parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: priceTotal,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;
      let transactionRedirectUrl = transaction.redirect_url;

      res.status(201).json({
        message: "Payment created successfully",
        orderId,
        orderToken: transactionToken,
        redirect_url: transactionRedirectUrl,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async successPayment(req, res, next) {
    try {
      const userId = req.user.id;
      const {
        brand,
        productName,
        price,
        amount,
        priceTotal,
        detailProduct,
        orderId,
      } = req.body;

      const data = await TransactionHistory.create({
        userId,
        brand,
        productName,
        price,
        amount,
        priceTotal,
        detailProduct,
        orderId,
      });

      res.status(200).json({
        message: "Payment success",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;

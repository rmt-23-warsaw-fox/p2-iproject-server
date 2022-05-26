const { Customer, Event, History, Order } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { payloadToToken } = require("../helpers/jwt");

const midtransClient = require("midtrans-client");
// Create Snap API instance
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-_aXPmdU9k32_9J1tDPCDj0W_",
  clientKey: "SB-Mid-client-rJQkrPkvx8zujvzn",
});

class customerController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const customer = await Customer.create({
        email,
        password,
      });

      const payload = { CustomerId: customer.id, email: customer.email };

      const token = payloadToToken(payload);

      res.status(201).json({
        message: "Customer registered successfully",
        access_token: token,
        CustomerId: customer.id,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const customer = await Customer.findOne({
        where: {
          email,
        },
      });

      if (!customer) {
        throw { name: "INVALID_EMAIL" };
      }

      const isMatch = comparePassword(password, customer.password);

      if (!isMatch) {
        throw { name: "INVALID_PASSWORD" };
      }

      const payload = { CustomerId: customer.id, email: customer.email };

      const token = payloadToToken(payload);

      res.status(200).json({
        statusCode: 200,
        message: "Customer logged in successfully",
        access_token: token,
        CustomerId: customer.id,
      });
    } catch (error) {
      next(error);
    }
  }

  static async historyList(req, res, next) {
    try {
      const { CustomerId } = req.user;

      const histories = await History.findAll({
        where: {
          CustomerId,
        },
        include: [
          {
            model: Event,
            attributes: ["nameOfEvent"],
          },
        ],
      });

      res.status(200).json({
        message: "Successfully get all histories",
        histories,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async beforeTransaction(req, res, next) {
    try {
      const { CustomerId } = req.user;
      const { orderedHands } = req.body;

      const createOrder = await Order.create({
        CustomerId,
        orderedHands,
      });

      let order = await Order.findAll();
      let order_id = order[order.length - 1].id + 10;
      let gross_amount = orderedHands * 100000;

      let parameter = {
        transaction_details: {
          order_id: `kamimampu-development-${order_id}`,
          gross_amount: gross_amount,
        },
      };

      const transaction = await snap.createTransaction(parameter);

      let transactionToken = transaction.token;

      // console.log("transactionToken:", transactionToken);

      let transactionRedirectUrl = transaction.redirect_url;

      // console.log("transactionRedirectUrl:", transactionRedirectUrl);

      res.status(200).json({
        token: transactionToken,
        redirect_url: transactionRedirectUrl,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async afterTransaction(req, res, next) {
    try {
      const { CustomerId } = req.user;
      const { orderedHands } = req.body;

      const customerFound = await Customer.findByPk(CustomerId);

      if (!customerFound) {
        throw { statusCode: 404 };
      }

      const increaseHands = await customerFound.increment("hands", {
        by: orderedHands,
      });
      const orderStatus = await Order.update(
        { status: "finished" },
        { where: { CustomerId } }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Transaction success",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = customerController;

const { Order, Product } = require("../models");
const { coreApi } = require("../helpers/midtrans");

class orderController {
  static async getOrder(req, res, next) {
    try {
      const orders = await Order.findAll();
      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  }

  static async userOrder(req, res, next) {
    try {
      const UserId = +req.pass.id;
      const userOrder = await Order.findOne({
        where: {
          UserId,
          status: "unpaid",
        },
        include: Product,
      });
      res.status(200).json(userOrder);
      // console.log(userOrder);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async createOrder(req, res, next) {
    try {
      const UserId = +req.pass.id;
      // console.log(req.pass, "<<<<<<");
      const ProductId = +req.params.ProductId;
      // console.log(req.params, "<<<<<<");
      const newOrder = await Order.create({
        UserId,
        ProductId,
      });
      res.status(201).json(newOrder);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async getVa(req, res, next) {
    try {
      // console.log(req.params, "???");
      const orderCode = req.params.orderCode;

      const va = await Order.findOne({
        where: {
          orderCode,
        },
      });
      // console.log(orderCode);
      // console.log(va, "<<<<<<<<<");
      res.status(200).json(va);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async charge(req, res, next) {
    try {
      const orderCode = req.params.orderCode;
      console.log(orderCode);
      const { bank, amount, payment_type } = req.body;
      const parameter = {
        payment_type: `${payment_type}`,
        transaction_details: {
          gross_amount: `${amount}`,
          order_id: `${orderCode}`,
        },
        bank_transfer: {
          bank: `${bank}`,
        },
      };
      const response = await coreApi.charge(parameter);
      console.log(response);
      await Order.update(
        {
          midtransResponse: JSON.stringify(response),
        },
        {
          where: {
            orderCode,
          },
        }
      );
      res.status(201).json(response);
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async notification(req, res, next) {
    try {
      const response = await coreApi.transaction.notification(req.body);
      const orderCode = response.order_id;
      const transactionStatus = response.transaction_status;

      console.log(
        `Transaction notification received. Order ID: ${orderCode}. Transaction status: ${transactionStatus}`
      );

      if (transactionStatus == "settlement") {
        await Order.update(
          {
            status: "success",
            midtransResponse: response,
          },
          {
            where: {
              orderCode,
            },
          }
        );
      } else if (
        transactionStatus == "cancel" ||
        transactionStatus == "expire"
      ) {
        await Order.update(
          {
            status: "failed",
            midtransResponse: response,
          },
          {
            where: {
              orderCode,
            },
          }
        );
      } else if (transactionStatus == "pending") {
        await Order.update(
          {
            status: "pending",
            midtransResponse: response,
          },
          {
            where: {
              orderCode,
            },
          }
        );
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = orderController;

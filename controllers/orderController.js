const { Order } = require("../models");

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
      const UserId = req.pass.id;
      const userOrder = Order.findAll(
        {
          where: {
            UserId,
            status: "unpaid",
          },
        },
        {
          include: Product,
        }
      );
      res.status(200).json(userOrder);
    } catch (err) {
      next(err);
    }
  }

  static async createOrder(req, res, next) {
    try {
      const UserId = req.pass.id;
      const ProductId = req.params.id;
      const newOrder = await Order.create({
        UserId,
        ProductId,
      });
      res.status(201).json(newOrder);
    } catch (err) {
      next(err);
    }
  }

  static async payOrder(req, res, next) {
    try {
      const paidOrder = await Order.update({
        status: "paid",
      });
      if (paidOrder[0] === 0) {
        throw new Error("Order not paid");
      }
      res.status(200).json({
        message: "Order paid",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = orderController;

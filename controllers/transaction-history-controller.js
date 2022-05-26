const { TransactionHistory } = require("../models");

class Controller {
  static async getTransactionHistory(req, res, next) {
    try {
      const userId = req.user.id;
      let { page } = req.query;
      if (!page) {
        page = 1;
      }
      const limit = 5;
      const offset = (page - 1) * limit;

      const countTransactionHistory = await TransactionHistory.findAll({
        where: { userId },
      });
      const totalPages = Math.ceil(countTransactionHistory.length / limit);
      const transactionHistory = await TransactionHistory.findAll({
        where: { userId },
        attributes: {
          exclude: ["updatedAt", "userId"],
        },
        order: [["createdAt", "DESC"]],
        limit,
        offset,
      });

      res.status(200).json({
        message: "Transaction history retrieved successfully",
        totalPages,
        transactionHistory,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

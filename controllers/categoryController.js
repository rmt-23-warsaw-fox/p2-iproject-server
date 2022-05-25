const { Category } = require("../models");

class categoryController {
  static async getCategory(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = categoryController;

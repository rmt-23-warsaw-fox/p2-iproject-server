const { User } = require("../models/index");

class PublicController {
  static async registerCustomer(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.create({
        email,
        password,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PublicController;

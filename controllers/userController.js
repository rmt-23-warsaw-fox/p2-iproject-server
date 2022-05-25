const { Product, User, Order, Category } = require("../models");

class userController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const newUser = await User.create({
        name,
        email,
        password,
        role: "user",
      });
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = userController;

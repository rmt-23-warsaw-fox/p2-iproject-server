const { User } = require("../models");
const { comparePassword, signToken } = require("../helpers");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "EMAIL_OR_PASSWORD_NOT_FOUND" };
      }

      const isTruePassword = comparePassword(password, customer.password);

      if (!isTruePassword) {
        throw { name: "EMAIL_OR_PASSWORD_NOT_FOUND" };
      }

      const token = signToken({
        id: customer.id,
        email: customer.email,
      });

      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;

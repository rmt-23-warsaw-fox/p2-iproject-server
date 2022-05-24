const { User } = require("../models");
const { comparePassword, signToken, verifyToken } = require("../helpers");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "EMAIL_OR_PASSWORD_NOT_FOUND" };
      }

      const isTruePassword = comparePassword(password, user.password);

      if (!isTruePassword) {
        throw { name: "EMAIL_OR_PASSWORD_NOT_FOUND" };
      }

      const token = signToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password, firstName, lastName, phoneNumber, address } =
        req.body;
      const user = await User.create({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        address,
      });

      res.status(201).json({
        message: "You have successfully registered",
      });
    } catch (err) {
      next(err);
    }
  }

  static async getUserProfile(req, res, next) {
    try {
      const token = req.headers.access_token;
      const { id } = verifyToken(token);
      const user = await User.findByPk(+id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        throw { name: "USER_NOT_FOUND" };
      }
      res.status(200).json({user});
    } catch (err) {
        console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;

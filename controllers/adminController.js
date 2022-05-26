const { Admin } = require("../models");
const { comparePassword, signToken } = require('../helpers');

class AdminController {
  static async register(req, res, next) {
    try {
      const { email, password, firstName, lastName, phoneNumber, address } =
        req.body;
      const newAdmin = await Admin.create({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        address,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Add new admin successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ where: { email } });

      if (!admin) {
        throw { name: "EMAIL_OR_PASSWORD_NOT_FOUND" };
      }

      const isPassword = comparePassword(password, admin.password);

      if (!isPassword) {
        throw { name: "EMAIL_OR_PASSWORD_NOT_FOUND" };
      }

      const token = signToken({
        id: admin.id,
        email: admin.email,
      });

      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdminController;

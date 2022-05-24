const { Admin } = require("../models");

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
}

module.exports = AdminController;

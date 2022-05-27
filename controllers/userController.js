"use strict";
const { checkPassword, createToken } = require("../helpers");
const { User } = require("../models");

class userController {
  static async register(req, res, next) {
    try {
      const { fullname, email, password } = req.body;

      const user = await User.create({
        fullname,
        email,
        password,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(403).json(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error({ name: "User not found" });
      }

      const correctPassword = checkPassword(password, user.password);

      if (!correctPassword) {
        throw new Error({ name: "Invalid email/password" });
      }

      const payload = {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
      };

      const token = createToken(payload);

      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      res.status(error);
    }
  }
}

module.exports = userController;

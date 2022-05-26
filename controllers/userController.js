const { checkPassword } = require("../helpers/bcrypt");
const { encode, decode } = require("../helpers/jwt");
const { User } = require("../models");
const { verification } = require("../helpers/sib");

class userController {
  static async register(req, res, next) {
    try {
      const { name, email, password, address } = req.body;
      const newUser = await User.create({
        name,
        email,
        password,
        role: "user",
        address,
      });
      const token = encode(newUser.id);
      const url = `https://a40f-111-94-12-118.ap.ngrok.io/users/verify/${token}`;
      verification(newUser.email, url);
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
  static async verify(req, res, next) {
    try {
      const token = req.params.token;
      const id = decode(token);
      const verified = await User.update(
        {
          verified: true,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({
        message: "Account verified",
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!foundUser.verified) {
        throw new Error("A verification link has sent to your email");
      }
      if (!foundUser) {
        throw new Error("Invalid email");
      }
      const validPassword = checkPassword(password, foundUser.password);
      if (!validPassword) {
        throw new Error("Invalid password");
      }
      const payload = {
        id: foundUser.id,
        email: foundUser.email,
      };
      const access_token = encode(payload);
      res.status(200).json({
        access_token,
      });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
}

module.exports = userController;

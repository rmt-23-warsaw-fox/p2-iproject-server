const { User } = require("../models/index");
const { compareHash, createHash } = require("../helpers/bcrypt");
const { createToken, signToken } = require("../helpers/jwt");
const { sendEmail } = require("../helpers/nodemailer");

class Controller {
  static async createUser(req, res, next) {
    try {
      const isActive = false;
      const { username, email, password, address, phone } = req.body;
      const newUser = await User.create({ username, email, password, phone, address, isActive });
      if (!newUser) {
        throw { name: "failedRegister" };
      }

      const payLoad = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      };

      const token = createToken(payLoad);
      sendEmail(newUser.email, token)
      res.status(201).json({
        statusCode: 201,
        message: "Register success",
        data: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          phone: newUser.phone,
          address: newUser.address,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  //login by link
  static async loginLink(req, res, next) {
    try {
      const access_token = req.query.token;
      const userId = signToken(access_token).id
      const user = await User.update({isActive : true},{
          where: {
              id : userId
          }
      })
      res.status(200).json({
          message: "Your Account ready to use",
          access_token: access_token
      })
    } catch (err) {
      next(err);
    }
  }os

  //login
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if(!email || !password) {
        throw{name : "require"}
      }
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!foundUser) {
        throw { name: "userNotFound" };
      }
      if(foundUser.isActive === false){
          throw{name : "accountIsNotActive"}
      }

      const correctPassword = compareHash(password, foundUser.password);

      if (!correctPassword) {
        throw{ name: "passIncorrect" };
      }

      const payLoad = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      };
      const access_token = createToken(payLoad);

      res.status(200).json({
        message: "Succes Login",
        access_token: access_token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;

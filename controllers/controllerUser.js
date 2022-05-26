'use strict';

const { User, Review } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

class ControllerUser {
  static async register(req, res, next) {
    try {
      const { email, password, address, phoneNumber } = req.body;

      const newUser = await User.create({
        email,
        password,
        address,
        phoneNumber,
      });
      
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      })
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const foundUser = await User.findOne({
        where: {
          email
        }
      })

      if (!foundUser) {
        throw new Error('USER_NOT_FOUND')
      }

      const isPassword = comparePassword(password, foundUser.password)

      if (!isPassword) {
        throw new Error('INCORRECT_PASSWORD')
      }

      const payload = {
        id: foundUser.id,
        email: foundUser.email
      }

      const access_token = signToken(payload)

      res.status(200).json({
        message: `You've logged in successfully`,
        access_token
      })
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = ControllerUser;

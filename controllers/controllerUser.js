'use strict';

const { User, Review } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const nodemailer = require('nodemailer');

class ControllerUser {
  static async register(req, res, next) {
    try {
      const { email, password, address, phoneNumber } = req.body;

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.email,
          pass: process.env.passwordEmail,
        },
      });

      var mailOptions = {
        from: 'fahri.aviciennaa@gmail.com',
        to: email,
        subject: 'Thank you for registrating to our website',
        text: `Start browsing the movie or anime that you wanna see the details~`,
      };

      const newUser = await User.create({
        email,
        password,
        address,
        phoneNumber,
      });

      const sender = await transporter.sendMail(mailOptions);

      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (err) {
      console.log(err);
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

      if (!foundUser) {
        throw new Error('USER_NOT_FOUND');
      }

      const isPassword = comparePassword(password, foundUser.password);

      if (!isPassword) {
        throw new Error('INCORRECT_PASSWORD');
      }

      const payload = {
        id: foundUser.id,
        email: foundUser.email,
      };

      const access_token = signToken(payload);

      res.status(200).json({
        message: `You've logged in successfully`,
        access_token,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = ControllerUser;

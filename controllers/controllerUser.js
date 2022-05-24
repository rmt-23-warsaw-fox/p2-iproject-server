"use strict";

const { OAuth2Client } = require("google-auth-library");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models/index");

class Controller {
  static async user(req, res, next) {
    try {
      const allUser = await User.findAll();
      res.status(200).json({
        statusCode: 200,
        data: allUser,
      });
    } catch (err) {
      next(err);
    }
  }

  static async registerAdmin(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        role: "admin",
      });
      res.status(201).json({
        statusCode: 201,
        message: "User successfully added",
        data: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async registerCustomer(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        role: "customer",
      });
      res.status(201).json({
        statusCode: 201,
        message: "Customer successfully registered",
        data: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const targetUser = await User.findOne({
        where: { email },
      });
      if (!targetUser) {
        throw new Error("wrong email");
      }
      const checkPassword = comparePassword(password, targetUser.password);
      if (!checkPassword) {
        throw new Error("wrong password");
      }
      const payload = {
        id: targetUser.id,
        username: targetUser.username,
        email: targetUser.email,
        role: targetUser.role,
      };
      const access_token = createToken(payload);
      res.status(200).json({
        statusCode: 200,
        message: "Login success",
        access_token: access_token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const { token } = req.body;
      const client = new OAuth2Client(process.env.clientId);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.clientId,
      });
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          password: Math.random().toString(36).substring(2, 7),
          role: "customer",
        },
      });
      const access_token = createToken({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        statusCode: 200,
        message: "Login success",
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;

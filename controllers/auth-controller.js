const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Profile } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.create({
        email,
        password,
      });
      const profile = await Profile.create({
        userId: user.id,
      });
      res.status(201).json({
        message: "User created successfully",
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw new Error("Email is required");
      }
      if (!password) {
        throw new Error("Password is required");
      }

      const user = await User.findOne({
        include: {
          model: Profile,
          as: "profile",
          attibuites: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error("Email or password is incorrect");
      }

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw new Error("Email or password is incorrect");
      }

      const payload = {
        id: user.id,
        email: user.email,
      };
      console.log(user);
      const token = signToken(payload);
      res.status(200).json({
        message: "User logged in successfully",
        access_token: token,
        userProfile: {
          id: user.profile.id,
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
          address: user.profile.address,
          phone: user.profile.phone,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

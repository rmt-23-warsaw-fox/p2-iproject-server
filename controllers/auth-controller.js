const { comparePassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");
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

      const token = signToken(payload);
      res.status(200).json({
        message: "User logged in successfully",
        access_token: token,
        userProfile: {
          id: user.profile.id,
          email: user.email,
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

  static async checkToken(req, res, next) {
    try {
      let code = 200;
      let message = "Token is valid";
      let data = {};

      const { access_token } = req.headers;
      if (access_token) {
        const decoded = verifyToken(access_token);
        const user = await User.findOne({
          include: {
            model: Profile,
            as: "profile",
            attributes: ["id", "firstName", "lastName", "address", "phone"],
          },
          where: {
            id: decoded.id,
          },
        });
        data = {
          id: user.id,
          email: user.email,
          profile: {
            id: user.profile.id,
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
            address: user.profile.address,
            phone: user.profile.phone,
          },
        };
      }
      res.status(200).json({
        message: "Token is valid",
        data,
      });
    } catch (error) {
      let code = 500;
      let message = "Internal Server Error";

      if (
        error.message === "jwt expired" ||
        error.message === "invalid signature" ||
        error.message === "jwt malformed" ||
        error.message === "jwt must be provided" ||
        error.message === "jwt audience invalid"
      ) {
        code = 401;
        message = "Token is expired";
      }

      res.status(code).json({
        message,
      });
    }
  }

  static async updateProfile(req, res, next) {
    try {
      let { firstName, lastName, address, phone } = req.body;
      if (phone[0] != 0) {
        phone = "0" + phone;
      }

      const user = await Profile.findOne({
        where: {
          id: req.user.id,
        },
      });
      if (!user) {
        throw new Error("User profile not found");
      }

      const data = await Profile.update(
        {
          firstName,
          lastName,
          address,
          phone,
        },
        {
          where: {
            userId: req.user.id,
          },
          returning: true,
        }
      );

      res.status(200).json({
        message: "Profile updated successfully",
        data: {
          id: data[1][0].userId,
          firstName: data[1][0].firstName,
          lastName: data[1][0].lastName,
          address: data[1][0].address,
          phone: data[1][0].phone,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;

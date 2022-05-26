"use strict";
const { User, Profile_Picture } = require("../models/index");
const { createToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/encryption");
class UserController {
  static async register(req, res, next) {
    try {
      // console.log(req.body);
      // console.log(req.file);
      const { displayName, email, password } = req.body;
      const imageType = req.file.mimetype;
      const imageName = req.file.originalname;
      const imageData = req.file.buffer;
      const createdUser = await User.create({
        displayName: displayName,
        email: email,
        password: password,
      });
      const createdPicture = await Profile_Picture.create({
        UserId: createdUser.id,
        imageType: imageType,
        imageData: imageData,
        imageName: imageName,
      });
      const token = createToken({
        id: createdUser.id,
        displayName: createdUser.displayName,
        email: createdUser.email,
      });
      res.status(201).json({
        message: "Registration successful!",
        access_token: token,
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
          email: email,
        },
        include: [Profile_Picture],
      });

      if (!foundUser) {
        throw new Error("user not found");
      }
      console.log(!comparePassword(password, foundUser.password));
      if (comparePassword(password, foundUser.password) === false) {
        throw new Error("user not found");
      }

      const token = createToken({
        id: foundUser.id,
        displayName: foundUser.displayName,
        email: foundUser.email,
      });

      res.status(200).json({
        message: "Welcome!",
        access_token: token,
      });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;

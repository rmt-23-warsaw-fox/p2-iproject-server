"use strict";
const axios = require("axios");
const dotenv = require('dotenv');
dotenv.config();
const { User, Profile_Picture } = require("../models/index");
const { createToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/encryption");
class UserController {
  static async register(req, res, next) {
    try {
      const { displayName, email, password } = req.body;
      let createdPicture;
      
      const createdUser = await User.create({
        displayName: displayName,
        email: email,
        password: password,
      });

      if (req.file) {
        const imageType = req.file.mimetype;
        const imageName = req.file.originalname;
        const imageData = req.file.buffer;
        if (!imageType.includes('image')){
          throw new Error('invalid image type')
        }
        createdPicture = await Profile_Picture.create({
          UserId: createdUser.id,
          imageType: imageType,
          imageData: imageData,
          imageName: imageName,
        });

      }else{
        const response = await axios.get('https://api.unsplash.com/photos/random/',{
          params: {
            client_id: process.env.UNSPLASH_ACCESS
          }
        })
        const unsplash_data = response.data;
        const imageUrl = unsplash_data.urls.small;
        createdPicture = await Profile_Picture.create({
          UserId: createdUser.id,
          imageType: "url",
          imageData: imageUrl,
          imageName: "unsplash_random_image",
        });
      }
      const token = createToken({
        id: createdUser.id,
        displayName: createdUser.displayName,
        email: createdUser.email,
      });
      res.status(201).json({
        message: "Registration successful!",
        access_token: token,
        User_Profile: {
          id: createdUser.id,
          displayName: createdUser.displayName,
          email: createdUser.email,
          Profile_Picture: createdPicture,
        }
      });
    } catch (err) {
      // console.log(err);
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

      if (comparePassword(password, foundUser.password) === false) {
        throw new Error("user not found");
      }

      const token = createToken({
        id: foundUser.id,
        displayName: foundUser.displayName,
        email: foundUser.email,
      });

      delete foundUser.password;

      res.status(200).json({
        message: "Welcome!",
        access_token: token,
        User_Profile: foundUser
      });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;

const { User } = require('../models');
const { comparePassowrd } = require('../helpers/helperBcrypt');
const { tokenMakerFromPayload } = require('../helpers/helperJwt');

class ControllerUser {
  static async showAllUser(req, res, next) {
    try {
      const userList = await User.findAll();

      res.status(200).json({
        statusCode: 200,
        data: userList,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const findUserByEmail = await User.findOne({
        where: { email },
      });
      if (!findUserByEmail) {
        throw { name: 'User_NOT_VALID' };
      }

      const passwordValidation = comparePassowrd(
        password,
        findUserByEmail.password
      );
      if (!passwordValidation) {
        throw { name: 'User_NOT_VALID' };
      }

      //!payload
      const payload = {
        id: findUserByEmail.id,
        email: findUserByEmail.email,
        isPremium: findUserByEmail.isPremium,
      };
      const accesToken = tokenMakerFromPayload(payload);
      //return data
      res.status(200).json({
        statusCode: 200,
        access_token: accesToken,
        isPremium: findUserByEmail.isPremium,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUser = await User.create({
        email,
        password,
      });

      res.status(201).json({
        statusCode: 201,
        data: {
          id: newUser.id,
          email: newUser.email,
        },
        message: 'user created succesfullly',
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async updateMembership(req, res, next) {
    try {
      const { id } = req.loginfo;

      const updateUser = await User.update(
        { isPremium: true },
        { where: { id } }
      );

      res.status(200).json({
        statusCode: 200,
        data: updateUser,
        message: 'membership updated succesfullly',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerUser;

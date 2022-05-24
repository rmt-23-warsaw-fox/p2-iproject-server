const { comparePassword } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const { User, Bookmark, Food } = require("../models/index");
const axios = require("axios");
class PublicController {
  static async registerCustomer(req, res, next) {
    try {
      const { username, email, password, address, phoneNumber } = req.body;
      const user = await User.create({
        username,
        email,
        password,
        address,
        phoneNumber,
      });
      res.status(200).json({
        id: user.id,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }
  static async loginCustomer(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error("failed_login");
      }
      const pswd = comparePassword(password, user.password);
      if (!pswd) {
        throw new Error("failed_login");
      }
      const payload = {
        UserId: user.id,
        UserEmail: user.email,
      };
      const access_token = createToken(payload);
      res.status(200).json({
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }
  static async getAllFoods(req, res, next) {
    try {
      const response = await axios({
        method: "get",
        url: "http://www.themealdb.com/api/json/v1/1/filter.php?a=American",
      });
      res.status(200).json({
        data: response.data,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async addBookmarks(req, res, next) {
    try {
      const { ApiId, ApiName, ApiThumb, price } = req.body;
      const { UserId } = req.dataUser;

      const food = await Food.create({
        ApiId,
        ApiName,
        ApiThumb,
        price,
      });

      const bookmark = await Bookmark.create({
        UserId,
        FoodId: food.id,
      });

      res.status(200).json(bookmark);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PublicController;

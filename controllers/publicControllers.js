const { comparePassword } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const { User, Bookmark, Food, Chef, Order } = require("../models/index");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
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

  static async loginGoogleCustomer(req, res, next) {
    try {
      const { token } = req.body;
      const client = new OAuth2Client(
        "252692457948-m6968rm29j0bems92mpada94fa4b4ti8.apps.googleusercontent.com"
      );
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience:
          "252692457948-m6968rm29j0bems92mpada94fa4b4ti8.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: "unknown",
          password: Math.random().toString(36).substring(2, 7),
          phoneNumber: "123456789",
          address: "unknown",
        },
      });

      const access_token = createToken({
        id: user.id,
        email: user.email,
      });
      res.status(200).json({
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAllFoods(req, res, next) {
    try {
      const { page = 1 } = req.query;
      const start = (page - 1) * 8;
      const mark = page * 8;
      const response = await axios({
        method: "get",
        url: "http://www.themealdb.com/api/json/v1/1/filter.php?a=American",
      });
      let data = response.data.meals.slice(start, mark);
      let totalPage = response.data.meals.length / 8;
      let currPage = +page;
      res.status(200).json({
        data,
        totalPage,
        currPage,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getBookmarks(req, res, next) {
    try {
      const { UserId } = req.dataUser;
      const bookmarks = await Bookmark.findAll({
        where: {
          UserId,
        },
        include: ["Food"],
      });
      res.status(200).json(bookmarks);
    } catch (err) {
      next(err);
    }
  }

  static async addBookmarks(req, res, next) {
    try {
      const { idMeal, strMeal, strMealThumb } = req.body;
      const { UserId } = req.dataUser;

      const searchF = await Food.findOne({
        where: {
          idMeal,
        },
      });
      if (!searchF) {
        const food = await Food.create({
          idMeal,
          strMeal,
          strMealThumb,
        });
        const bookmark = await Bookmark.create({
          UserId,
          FoodId: food.id,
        });
        res.status(200).json(bookmark);
      } else {
        const bookmark = await Bookmark.create({
          UserId,
          FoodId: searchF.id,
        });
        res.status(200).json(bookmark);
      }
    } catch (err) {
      next(err);
    }
  }
  static async getAllChef(req, res, next) {
    try {
      const chefs = await Chef.findAll({});
      res.status(200).json(chefs);
    } catch (err) {
      next(err);
    }
  }

  static async addOrder(req, res, next) {
    try {
      const { UserId } = req.dataUser;
      const { ChefId, totalPrice, status, virtualAccount, external_id } =
        req.body;

      const find = await Order.findOne({
        where: {
          UserId,
        },
      });
      if (!find) {
        const order = await Order.create({
          ChefId,
          totalPrice,
          status,
          virtualAccount,
          external_id,
          UserId,
        });
        const bookmark = await Bookmark.update(
          {
            OrderId: order.id,
          },
          {
            where: {
              UserId,
            },
          }
        );
        res.status(200).json(order);
      } else {
        const order = await Order.update(
          {
            ChefId,
            totalPrice,
            status,
            virtualAccount,
            external_id,
            UserId,
          },
          {
            where: {
              id: find.id,
            },
          }
        );
        const bookmark = await Bookmark.update(
          {
            OrderId: find.id,
          },
          {
            where: {
              UserId,
            },
          }
        );
        res.status(200).json(order);
      }
    } catch (err) {
      next(err);
    }
  }
  static async getOrder(req, res, next) {
    try {
      const { UserId } = req.dataUser;
      const order = await Order.findAll({
        where: {
          UserId,
          status: "PENDING",
        },
      });
      res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PublicController;

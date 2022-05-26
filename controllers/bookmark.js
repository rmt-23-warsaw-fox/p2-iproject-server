const { Bookmark } = require("../models/index.js");

class Controller {
  static async addBook(req, res, next) {
    try {
      const UserId = req.user.id;
      let mycoins = 0;
      let myamount = 0;
      const { name, code, price, percentace, image } = req.body;
      const uniq = await Bookmark.findOne({
        where: {
          name: name,
        },
      });

      if (uniq) {
        throw { name: "cryptoAdded" };
      }
      const data = await Bookmark.create({
        name,
        code,
        price,
        percentace,
        image,
        mycoins,
        myamount,
        UserId,
      });
      res.status(201).json({
        message: `Success add ${data.name} coin to bookmark`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getMyCoins(req, res, next) {
    try {
      const UserId = req.user.id;
      const data = await Bookmark.findAll({
        where: {
          UserId: UserId,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const bookId = req.body.bookmarkId;
      const del = await Bookmark.destroy({
        where: {
          id: bookId,
        },
      });
      res.status(200).json({
        message: "success delete",
      });
    } catch (err) {
      next(err);
    }
  }

  static async putcoins(req, res, next) {
    try {
      const bookId = req.body.bookmarkId;
      const mycoins = +req.body.mycoins;
      const price = +req.body.price
      console.log(price);
      const myamount =  price * mycoins;
      console.log(myamount);
      const put = await Bookmark.update(
        { mycoins, myamount },
        {
          where: {
            id: bookId,
          },
        }
      );
      res.status(201).json({
        message: "success add amount",
      });
    } catch (err) {
        console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;

"use strict";

const { Package, User, Major, Buy } = require("../models/index");
const { Op } = require("sequelize");

class PackageController {
  static async products(req, res, next) {
    try {
      let offsetFilter = 0;
      let item = [];
      const { offset, major, title } = req.query;
      if (offset) {
        offsetFilter = offset;
      }

      if (major) {
        item.push({ MajorId: major });
      }

      if (title) {
        item.push({ title: { [Op.iLike]: `%${title}%` } });
      }
      let filter = { [Op.and]: item };
      const products = await Package.findAndCountAll({
        limit: 9,
        offset: offsetFilter,
        where: filter,
        include: [Buy, Major],
      });
      res.status(200).json({
        data: products,
      });
    } catch (err) {
      next(err);
    }
  }

  static async major(req, res, next) {
    try {
      const major = await Major.findAll();
      res.status(200).json({
        data: major,
      });
    } catch (err) {
      next(err);
    }
  }

  static async buy(req, res, next) {
    try {
      const { id } = req.params;

      const findPackage = await Package.findByPk(id);

      if (!findPackage) {
        throw new Error(404);
      }

      const findBuy = await Buy.findOne({
        where: {
          PackageId: id,
          UserId: req.data.id,
        },
      });

      if (findBuy) {
        throw new Error(800);
      }

      const newBuy = await Buy.create({
        PackageId: id,
        UserId: req.data.id,
      });
      res.status(200).json({
        data: newBuy,
      });
    } catch (err) {
      next(err);
    }
  }

  static async listBuy(req, res, next) {
    try {
      const { id } = req.data;

      const findUser = await User.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Buy,
            include: [Package],
          },
        ],
      });

      // if()

      res.status(200).json({
        data: findUser,
      });
    } catch (err) {
      next(err);
    }
  }

  static async id(req, res, next) {
    try {
      const { id } = req.params;
      const video = await Package.findOne({
        where: {
          id,
        },
        include: [User, Major],
      });

      if (!video) {
        throw new Error("404");
      }
      res.status(200).json({
        data: video,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteBuy(req, res, next) {
    try {
      const { id } = req.params;
      const findPackage = await Package.findByPk(id);

      if (!findPackage) {
        throw new Error(404);
      }

      await Buy.destroy({
        where: {
          PackageId: id,
          UserId: req.data.id,
        },
      });
      res.status(200).json({
        message: `success to cancel buy ${findPackage.name} package`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async kemdikbud(req, res, next) {
    try {
      // const {id} = req.params
      fetch("http://example.com/movies.json")
      .then((response) => response.json())
      .then((data) => console.log(data));
      console.log(244);
      const response = await fetch(
        `https://npd.kemdikbud.go.id/?appid=getun&kodeprov=040000`
      );
      console.log("lolo");
      let data = await response.json();
      console.log(data, "<<");
      fetch("http://example.com/movies.json")
        .then((response) => response.json())
        .then((data) => console.log(data));
      res.status(200).json({
        iniData: data,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = PackageController;

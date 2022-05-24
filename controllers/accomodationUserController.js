const { Accomodation, Type } = require("../models");
const { verifyToken } = require("../helpers");
const { Op } = require("sequelize");

class AccomodationUserController {
  static async fetchAllAccomodations(req, res, next) {
    try {
      const accomodations = await Accomodation.findAll({
        include: [
          {
            model: Type,
            attributes: ["name"],
          },
        ],
      });

      res.status(200).json(accomodations);
    } catch (err) {
      next(err);
    }
  }
  static async fetchAccomodationByCity(req, res, next) {
    try {
      const { city } = req.body;
      const accomodations = await Accomodation.findAll({
        where: {
          city : city
        },
        include: [
          {
            model: Type,
            attributes: ["name"],
          },
        ],
      });

      res.status(200).json(accomodations);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AccomodationUserController;

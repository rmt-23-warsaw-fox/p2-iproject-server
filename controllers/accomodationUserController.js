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
      const { city } = req.params;
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

  static async fetchAccomodationByLocation(req, res, next) {
    try {
      const { location } = req.query;
      const accomodations = await Accomodation.findAll({
        where: {
          city : {
            [Op.iLike]: `%${location}%`
          }
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

  static async fetchAccomodationById(req, res, next) {
    try {
      const { id } = req.params;
      const accomodation = await Accomodation.findByPk(+id, {
        include: {
          model: Type,
          attributes: ['name'],
        }
      });

      if(!accomodation) {
        throw { name: "ACCOMODATION_NOT_FOUND" }
      }

      res.status(200).json(accomodation)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = AccomodationUserController;

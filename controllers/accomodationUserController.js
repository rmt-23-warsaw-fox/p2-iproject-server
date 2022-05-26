const { Accomodation, Type } = require("../models");
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
      const { city, province } = req.query;
      const accomodations = await Accomodation.findAll({
        where: {
          [Op.or]: {
            city: {
              [Op.iLike]: `%${city}%`,
            },
            location: {
              [Op.iLike]: `%${province}%`,
            },
          },
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
      const { location, TypeId } = req.query;
      const option = location || TypeId ? { where: {} } : {};
      if (location) option.where.location = { [Op.iLike]: `%${location}%` };
      if (TypeId) option.where.TypeId = +TypeId;
      option.include = [
        {
          model: Type,
          attributes: ["name"],
        },
      ];
      const accomodations = await Accomodation.findAll(option);

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
          attributes: ["name"],
        },
      });

      if (!accomodation) {
        throw { name: "ACCOMODATION_NOT_FOUND" };
      }

      res.status(200).json(accomodation);
    } catch (err) {
      next(err);
    }
  }

}

module.exports = AccomodationUserController;

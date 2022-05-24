const { Accomodation, Type } = require("../models");
const { verifyToken } = require("../helpers");

class AccomodationUserController {
  
  static async fetchAllAccomodations(req, res, next) {
    try {
      const accomodations = await Accomodation.findAll({
        include: [
          {
            model: Type,
            attributes: ["name"],
          }
        ],
      });

      res.status(200).json(accomodations);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AccomodationUserController;

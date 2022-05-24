const { Accomodation, Admin } = require('../models');
const { verifyToken } = require('../helpers');

class AccomodationController {
  static async create(req, res, next) {
    try {
      const { access_token } = req.headers;
      const payload =  verifyToken(access_token);
      let { name, facility, roomCapacity, imageUrl, location, price, TypeId } = req.body;
      price = +price;
      roomCapacity = +roomCapacity;
      await Accomodation.create({
        name,
        facility,
        roomCapacity,
        imageUrl,
        location,
        price,
        TypeId,
        AdminId: payload.id
      });

      res.status(201).json({
        message: `Adding new accomodation successfully`,
      });
    } catch (err) {
        console.log(err);
      next(err);
    }
  }
}

module.exports = AccomodationController;

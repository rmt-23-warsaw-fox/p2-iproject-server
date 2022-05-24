"use strict";

const { Userseat } = require("../models/index");

class Controller {
  static async checkSeats(req, res, next) {
    try {
      const seats = Userseat.findAll();
      console.log(seats);
      res.status(200).json({
        statuscode: 200,
        seats,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;

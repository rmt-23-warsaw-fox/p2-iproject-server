"use strict";

const { UserSeat, SeatRow, Movie } = require("../models/index");

class Controller {
  static async checkSeats(req, res, next) {
    //yang sudah di-booking
    try {
      const seats = UserSeat.findAll();
      //   console.log(seats);
      res.status(200).json({
        statuscode: 200,
        seats,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async rows(req, res, next) {
    try {
      const allRow = await SeatRow.findAll();
      res.status(200).json({
        statuscode: 200,
        allRow,
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async bookedSeats(req, res, next) {
    try {
      const UserId = req.currentUser.id;
      //   console.log(UserId);
      const booked = await UserSeat.findAll({
        where: { UserId },
        // include: { model: Movie },
      });
      //   console.log(booked);
      res.status(200).json({
        statuscode: 200,
        booked,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async booking(req, res, next) {
    //booking
    try {
      const { seatNumber, MovieTitle } = req.body;
      const UserId = req.currentUser.id;
      //   const { MovieId } = req.params;
      const checkSeats = await UserSeat.findOne({
        where: { MovieTitle, seatNumber },
      });
      if (checkSeats) {
        throw new Error("Seats is unavailable");
      }
      const booking = await UserSeat.create({
        seatNumber,
        UserId,
        // MovieId,
        MovieTitle,
      });
      //   console.log(booking);
      res.status(201).json({
        statuscode: 201,
        booking,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;

"use strict";

const { SeatRow, Ticket } = require("../models/index");
const nodemailer = require("nodemailer");
const x = require("../helpers/xendit");
const { EWallet, Customer } = x;
const ew = new EWallet({});

class Controller {
  static async checkSeats(req, res, next) {
    try {
      const seats = Ticket.findAll();
      res.status(200).json({
        statuscode: 200,
        seats,
      });
    } catch (error) {
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
      const booked = await Ticket.findAll({
        where: { UserId },
      });
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
    try {
      const { seatNumber, movie } = req.body;
      const UserId = req.currentUser.id;
      const charge = await ew.createEWalletCharge({
        referenceID: Date.now().toString(),
        currency: "IDR",
        amount: +movie.ticketPrice,
        checkoutMethod: "ONE_TIME_PAYMENT",
        channelCode: "ID_SHOPEEPAY",
        channelProperties: {
          successRedirectURL: "http://localhost:3000/ticket",
          failureRedirectURL: "http://localhost:3000",
        },
        basket: [
          {
            referenceID: `${movie.id}`,
            name: `${movie.title} ticket`,
            category: "ticket",
            currency: "IDR",
            price: movie.ticketPrice,
            quantity: 1,
            type: "product",
          },
        ],
      });
      console.log("Test pay :", charge.actions);
      console.log("Test Account :", testAccount);
      let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      let info = await transporter.sendMail({
        from: '"Admin" <admin@email.com>',
        to: `${req.currentUser.email}`,
        subject: "Booking seats",
        text: `Thanks you, ${req.currentUser.username}. please finish the payment process by entering following link`, // plain text body
        html: `a href="${charge.actions.mobile_deeplink_checkout_url}">Click Here!</a>`, // html body
      });
      const checkSeats = await Ticket.findOne({
        where: { movieTitle: movie.title, seatNumber, movieId: movie.id },
      });
      if (checkSeats) {
        throw new Error("Seats is unavailable");
      }
      const booking = await Ticket.create({
        seatNumber,
        UserId,
        movieId: movie.id,
        movieTitle: movie.title,
        movieImg: movie.backdrop_path,
      });
      res.status(201).json({
        statuscode: 201,
        booking,
        payment: charge.actions,
        "dummy account": testAccount,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

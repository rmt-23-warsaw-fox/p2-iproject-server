"use strict";

const { UserSeat, SeatRow, Movie, Ticket } = require("../models/index");
const nodemailer = require("nodemailer");
const x = require("../helpers/xendit");
const { EWallet, Customer } = x;
const ew = new EWallet({});
const c = new Customer({});
// console.log(x);

class Controller {
  static async checkSeats(req, res, next) {
    //yang sudah di-booking
    try {
      //   const seats = UserSeat.findAll();
      const seats = Ticket.findAll();
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
      //   const booked = await UserSeat.findAll({
      //     where: { UserId },
      //     // include: { model: Movie },
      //   });
      const booked = await Ticket.findAll({
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
      const { seatNumber, movie } = req.body;
      const UserId = req.currentUser.id;
      //   console.log(movie, "=== MOVIE ===");
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
      // eslint-disable-next-line no-console
      console.log("created ewallet payment charge:", charge);
      console.log("Test pay :", charge.actions);
      let testAccount = await nodemailer.createTestAccount();
      console.log(testAccount);
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
        from: '"Admin" <admin@email.com>', // sender address
        to: `${req.currentUser.email}`,
        subject: "Booking seats", // Subject line
        text: `Thanks you, ${req.currentUser.username}. please finish the payment process by entering following link`, // plain text body
        html: `a href="${charge.actions.mobile_deeplink_checkout_url}">Click Here!</a>`, // html body
      });
      //   const payment = await ew.createPayment({
      //     externalID: Date.now().toString(),
      //     amount: 1,
      //     // phone: '081234567890',
      //     callbackURL: "https://eo3he3j6f55qq9r.m.pipedream.net",
      //     redirectURL: "http://localhost:3000/ticket/",
      //     ewalletType: EWallet.Type.Dana,
      //   });
      //   // eslint-disable-next-line no-console
      //   console.log("created payment detail:", payment);

      //   const retrievedPayment = await ew.getPayment({
      //     externalID: payment.external_id,
      //     ewalletType: payment.ewallet_type,
      //   });
      //   // eslint-disable-next-line no-console
      //   console.log("EWallet payment detail:", retrievedPayment);

      //   const retrievedCharge = await ew.getEWalletChargeStatus({
      //     chargeID: charge.id,
      //   });
      //   // eslint-disable-next-line no-console
      //   console.log("retrieved ewallet payment charge:", retrievedCharge);

      //   const voidedCharge = await ew.voidEWalletCharge({
      //     chargeID: charge.id,
      //   });
      //   // eslint-disable-next-line no-console
      //   console.log("voided ewallet payment charge:", voidedCharge);
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

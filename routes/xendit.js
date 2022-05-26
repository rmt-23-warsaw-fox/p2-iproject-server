const express = require("express");
const xendit = express.Router();
const axios = require("axios");
require("dotenv").config();
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const { Order, Bookmark } = require("../models");
xendit.post("/create", async function (req, res, next) {
  try {
    const { bank_code, totalPrice } = req.body;
    const { UserName } = req.dataUser;
    const response = await axios({
      method: "post",
      url: "https://api.xendit.co/callback_virtual_accounts",
      auth: {
        username:
          "xnd_development_m7B4Ljt4NfM75gfefg9rkgMoPg9ERQTurFWogGlhgaDJPEs44CcFNlyphBxfT",
        password: "Mario.fredo2",
      },
      data: {
        is_closed: true,
        external_id: `VA-fixed-${Date.now()}`,
        bank_code,
        name: UserName,
        suggested_amount: totalPrice,
        expected_amount: totalPrice,
        is_single_use: true,
      },
    });

    res.status(200).json(response.data);
  } catch (err) {
    next(err);
  }
});
xendit.post("/pay", async function (req, res, next) {
  try {
    const { UserId } = req.dataUser;
    const { external_id, totalPrice } = req.body;
    const response = await axios({
      method: "post",
      url: `https://api.xendit.co/callback_virtual_accounts/external_id=${external_id}/simulate_payment`,
      auth: {
        username:
          "xnd_development_m7B4Ljt4NfM75gfefg9rkgMoPg9ERQTurFWogGlhgaDJPEs44CcFNlyphBxfT",
        password: "Mario.fredo2",
      },
      data: {
        amount: totalPrice,
      },
    });
    const order = await Order.update(
      {
        status: response.data.status,
      },
      {
        where: {
          UserId,
        },
      }
    );
    const bookmark = await Bookmark.destroy({
      where: {
        UserId,
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    next(err);
  }
});
module.exports = xendit;

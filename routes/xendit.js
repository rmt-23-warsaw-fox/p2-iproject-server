const express = require("express");
const xendit = express.Router();
const axios = require("axios");
const isLogin = require("../middlewares/authn");
// const Xendit = require("xendit-node");
// const x = new Xendit({
//   secretKey:
//     "xnd_development_m7B4Ljt4NfM75gfefg9rkgMoPg9ERQTurFWogGlhgaDJPEs44CcFNlyphBxfT",
// });
// const { VirtualAcc } = x;
// const vaSpecificOptions = {};
// const va = new VirtualAcc(vaSpecificOptions);
xendit.post("/create", async function (req, res, next) {
  try {
    const { bank_code, totalPrice } = req.body;
    const { Username } = req.dataUser;
    const response = await axios({
      method: "post",
      url: "https://api.xendit.co/callback_virtual_accounts",
      auth: {
        username:
          "xnd_development_m7B4Ljt4NfM75gfefg9rkgMoPg9ERQTurFWogGlhgaDJPEs44CcFNlyphBxfT",
        password: "Mario.fredo2",
      },
      data: {
        external_id: `VA-fixed-${Date.now()}`,
        bank_code,
        name: Username,
        suggested_amount: totalPrice,
        expected_amount: totalPrice,
        is_single_use: true,
      },
    });
    res.status(200).json(response.data);

    // const fixedAcc = await va.createFixedVA({
    //   externalID: `VA-fixed-${Date.now()}`,
    //   bankCode: bank_code,
    //   name: Username,
    //   suggestedAmt: totalPrice,
    //   expectedAmt: totalPrice,
    //   isSingleUse: true,
    // });
    // res.status(200).json(fixedAcc);
  } catch (err) {
    next(err);
  }
});

module.exports = xendit;

const Xendit = require("xendit-node");

const dotenv = require("dotenv");

dotenv.config();

const x = new Xendit({
  secretKey: process.env.SECRET_KEY,
  xenditURL: process.env.XENDIT_URL,
});

module.exports = x;

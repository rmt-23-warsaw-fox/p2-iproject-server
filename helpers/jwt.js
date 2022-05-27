const jwt = require("jsonwebtoken");

const KEY = "NGODINGWITHSUPERPOWEL";

const createToken = (payload) => {
  return jwt.sign(payload, KEY);
};

const signToken = (token) => {
  return jwt.verify(token, KEY);
};

module.exports = {
  createToken,
  signToken,
};

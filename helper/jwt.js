const jwt = require("jsonwebtoken");
require("dotenv").config();
const TOKEN = process.env.TOKEN_RAHASIA;

function createToken(payload) {
  return jwt.sign(payload, TOKEN);
}

function verifyToken(token) {
  return jwt.verify(token, TOKEN);
}

module.exports = {
  createToken,
  verifyToken,
};

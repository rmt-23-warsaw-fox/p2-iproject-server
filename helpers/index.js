const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function checkPassword(input, hashed) {
  return bcrypt.compareSync(input, hashed);
}

function createToken(payload) {
  return jwt.sign(payload, process.env.KEY);
}

function verifyToken(payload) {
  return jwt.verify(payload, process.env.KEY);
}

module.exports = {
  hashPassword,
  checkPassword,
  createToken,
  verifyToken,
};

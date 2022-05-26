const jwt = require("jsonwebtoken");
const secret = "secret";

const signToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = {
  signToken,
  verifyToken,
};

const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const SECRET = process.env.SECRET_KEY;

const encode = (payload) => jwt.sign(payload, SECRET);
const decode = (token) => jwt.verify(token, SECRET);

module.exports = { encode, decode };

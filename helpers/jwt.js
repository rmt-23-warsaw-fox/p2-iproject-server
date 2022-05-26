const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const createToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET);
const readPayload = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {createToken, readPayload};
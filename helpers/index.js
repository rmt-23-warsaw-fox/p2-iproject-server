const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const hashPassword = (plain) => bcrypt.hashSync(plain, 9);
const comparePassword = (plain, hPass) => bcrypt.compareSync(plain, hPass);
const signToken = (payload) => jwt.sign(payload, process.env.SECRET_KEY);
const verifyToken = (token) => jwt.verify(token, process.env.SECRET_KEY);

module.exports = { 
    hashPassword,
    comparePassword,
    signToken,
    verifyToken
 }
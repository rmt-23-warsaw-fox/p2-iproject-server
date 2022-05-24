const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "rahasialelaki"

const hashPassword = (plain) => bcrypt.hashSync(plain, 9);
const comparePassword = (plain, hPass) => bcrypt.compareSync(plain, hPass);
const signToken = (payload) => jwt.sign(payload, SECRET_KEY);
const verifyToken = (token) => jwt.verify(token, SECRET_KEY);

module.exports = { 
    hashPassword,
    comparePassword,
    signToken,
    verifyToken
 }
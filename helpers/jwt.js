require('dotenv').config()
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET;
// console.log('jwt jalan <<<<<<<<<<<<<<<')
const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, {
        expiresIn: "3h"
    });
}

const convertToken = (token) => {
    return jwt.verify(token, secretKey);
};

module.exports = {
    generateToken,
    convertToken
}
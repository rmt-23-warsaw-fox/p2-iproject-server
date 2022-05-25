"use strict"
var jwt = require('jsonwebtoken');

function createToken(data) {
    const token = jwt.sign(data, process.env.SECRETKEY);
    return token
}

function readToken(data) {
    const decoded = jwt.verify(data, process.env.SECRETKEY);
    return decoded
}

module.exports = {
    createToken,
    readToken
}
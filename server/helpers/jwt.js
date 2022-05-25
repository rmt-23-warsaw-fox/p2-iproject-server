var jwt = require('jsonwebtoken');

function createToken(payload) {
  return jwt.sign(payload, 'aman')
}

function decodeToken (access_token){
  return jwt.verify(access_token, 'aman')
}

module.exports = {createToken, decodeToken}
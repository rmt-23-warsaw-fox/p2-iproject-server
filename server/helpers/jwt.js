const jwt = require('jsonwebtoken')

const createToken = payload => jwt.sign(payload, process.env.SECRET || 'secret')
const decodeToken = token => jwt.verify(token, process.env.SECRET || 'secret')

module.exports = {
  createToken,
  decodeToken
}
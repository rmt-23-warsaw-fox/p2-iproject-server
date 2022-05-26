const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = "secret"

const hashpw = (password) => {
  return bcrypt.hashSync(password,8)
}

const checkpw = (password,hash) => {
  return bcrypt.compareSync(password,hash)
}

const createToken = (payload) => {
  return jwt.sign(payload,secret)
}

const readToken = (token) => {
  return jwt.verify(token,secret)
}

module.exports = {
  hashpw,
  checkpw,
  createToken,
  readToken
}
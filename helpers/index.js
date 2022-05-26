const bcrypt = require('bcryptjs')

function hashPassword(password) {
  return bcrypt.hashSync(password, 8)
}

function comparePassword(password, hashPass) {
  return bcrypt.compareSync(password, hashPass)
}

const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET

const createToken = (data) => {
  return jwt.sign(data, secretKey)
}

const readPayLoad = (token) => {
  return jwt.verify(token, secretKey)
}

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  readPayLoad
}
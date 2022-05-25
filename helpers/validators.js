const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const hashPass = (password) => {
  return bcrypt.hashSync(password, 10)
}

const comparePass = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

const createToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET)
}

const readToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
  hashPass,
  comparePass,
  createToken,
  readToken,
}

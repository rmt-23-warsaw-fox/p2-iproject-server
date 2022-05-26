const bcrypt = require('bcrypt');

function createHash(password) {
  return bcrypt.hashSync(password, 8)
}

function compareHash(password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword)
}

module.exports = {createHash, compareHash}
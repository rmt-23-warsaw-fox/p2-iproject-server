const bcryptjs = require('bcryptjs');

function hashPassword(password) {
  return bcryptjs.hashSync(password, 10)
}

function comparePassword(password, hash) {
  return bcryptjs.compareSync(password, hash)
}

module.exports = {
  hashPassword, comparePassword
}
const bcrypt = require('bcryptjs')

const hashing = password => bcrypt.hashSync(password, 10)
const comparing = (password, hashed) => bcrypt.compareSync(password, hashed)

module.exports = {
  hashing,
  comparing
}
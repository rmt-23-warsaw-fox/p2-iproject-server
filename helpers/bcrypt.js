const bcrypt = require("bcrypt");

const hashedPassword = (password) => bcrypt.hashSync(password, 8);
const checkPassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

module.exports = { hashedPassword, checkPassword };

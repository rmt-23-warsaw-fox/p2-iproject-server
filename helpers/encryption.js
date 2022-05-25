const bcrypt = require('bcryptjs');

const hashPassword = (password) => bcrypt.hashSync(password);
const comparePassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

module.exports = {hashPassword, comparePassword};
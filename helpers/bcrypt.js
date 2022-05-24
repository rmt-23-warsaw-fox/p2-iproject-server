const bcrypt = require("bcrypt");

const createHash = (pass) => {
  return bcrypt.hashSync(pass, 8);
};

const compareHash = (pass, hash) => {
  return bcrypt.compareSync(pass, hash);
};

module.exports = {
  createHash,
  compareHash,
};

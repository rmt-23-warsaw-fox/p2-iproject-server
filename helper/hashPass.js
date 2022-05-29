"use strict"
const bcrypt = require('bcryptjs');

function createHash(data) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data, salt);
    return hash
}

function readHash(data, hash) {
   return bcrypt.compareSync(data, hash);
}

module.exports = {
    createHash,
    readHash
}
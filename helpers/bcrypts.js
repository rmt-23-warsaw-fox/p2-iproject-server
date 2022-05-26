"use strict"

const bcryptjs = require("bcryptjs")

const hashPassword = (password) =>{
    let salt = bcryptjs.genSaltSync(10)
    return bcryptjs.hashSync(password, salt)
}

const hashCompare = (password, hash) =>{
    return bcryptjs.compareSync(password, hash)
}

module.exports = {
    hashPassword,
    hashCompare
}
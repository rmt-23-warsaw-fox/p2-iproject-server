'use strict'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const KEY = process.env.SECRET_KEY

const hashingPass = (password) => {
    return bcrypt.hashSync(password, 8)
}

const compareHash = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

const createToken = (payload) => {
    return jwt.sign(payload, KEY)
}

const readPayload = (token) => {
    return jwt.verify(token, KEY)
}

module.exports = {
    hashingPass,
    compareHash,
    createToken,
    readPayload
}


'use strict'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

const hashingPass = (password) => {
    return bcrypt.hashSync(password, 8)
}

const compareHash = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

const createToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY)
}

const readPayload = (token) => {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = {
    hashingPass,
    compareHash,
    createToken,
    readPayload
}


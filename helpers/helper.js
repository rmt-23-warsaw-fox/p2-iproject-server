const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const secretKey = "sisisisi"

const hashingPass = (plaintext) => bcrypt.hashSync(plaintext, 8)
const compareHashWithPass = (plaintext, hash) => bcrypt.compareSync(plaintext, hash)

const createToken = (payload) => jwt.sign(payload, secretKey)
const readPayload = (token) => jwt.verify(token, secretKey)

module.exports = {
    hashingPass,
    compareHashWithPass,
    createToken,
    readPayload
} 
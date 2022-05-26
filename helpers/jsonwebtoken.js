"use strict"

const jwt = require("jsonwebtoken")

const key = "SECRET KEY"

const createToken = (data) =>{
    return jwt.sign(data, key)
}

const payLoad = (token) => {
    return jwt.verify(token, key)
}

module.exports = {
    createToken,
    payLoad
}
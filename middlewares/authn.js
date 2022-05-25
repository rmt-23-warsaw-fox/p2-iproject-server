"use strict"

const { readToken } = require("../helpers/validator")
const { User } = require("../models/index")

const authN = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    if (!access_token) throw new Error("user not found")

    const payload = readToken(access_token)
    const foundUser = await User.findByPk(+payload.id)

    if (!foundUser) throw new Error("user not found")

    req.userData = {
      id: foundUser.id,
      email: foundUser.email,
      dotaId: foundUser.dotaId,
    }

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = { authN }

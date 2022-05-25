"use strict"

const { comparePass, createToken, scanDotaId } = require("../helpers/validators")
const { User } = require("../models")

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, dotaId } = req.body
      const input = { username, email, password, dotaId }

      const legit = await scanDotaId(dotaId)
      if (!legit) throw new Error("dota")
      const create = await User.create(input)
      res.status(201).json({
        statusCode: 201,
        message: `Welcome aboard ${create.username}!`,
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = UserController

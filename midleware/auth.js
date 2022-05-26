'use strict'

const { readPayload } = require("../helpers/helper")
const { User } = require('../models/index')

const authN = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        const payload = readPayload(access_token)

        const findUser = await User.findByPk(+payload.id)

        if (!findUser) {
            throw new Error('USER NOT FOUND')
        }

        req.additionalData = {
            id: findUser.id,
            email: findUser.email
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authN
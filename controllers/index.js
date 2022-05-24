"use strict"

const { User } = require("../models")

class Controller {
    static async register(req, res, next){
        try {
            const { userName, email, password } = req.body
            const createUser = await User.create({
                userName,
                email,
                password
            })

            res.status(201).json({
                message:"Succes Register Account",
                createUser
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller
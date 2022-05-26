'use strict'

const { compareHash, createToken } = require("../helpers/helper")
const { User } = require("../models")

class UserController {

    //! REGISTER USER
    static async register(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            const newUser = await User.create({
                username,
                email,
                password,
                phoneNumber,
                address,
            })

            res.status(201).json({
                statusCode: 201,
                message: `User has been created successfully`,
                data: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email
                }
            })

            next()
        }
        catch (err) {
            console.log(err);
            next(err)
        }
    }

    //! LOGIN USER
    static async login(req, res, next) {
        try {
            console.log('massuukk');
            const { email, password } = req.body
            const checkUser = await User.findOne({
                where: {
                    email
                }
            })

            if (!checkUser) {
                throw new Error('USER NOT FOUND')
            }

            const correctPassword = compareHash(password, checkUser.password)

            if (!correctPassword) {
                throw new Error('USER NOT FOUND')
            }

            const payload = {
                id: checkUser.id,
                email: checkUser.email
            }

            const access_token = createToken(payload)

            res.status(200).json({
                statusCode: 200,
                access_token,
                idUser: checkUser.id,
                message: `successful access`,
            })
            next()

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = UserController
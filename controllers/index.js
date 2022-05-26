"use strict"

const { User } = require("../models")
const { Op } = require("sequelize")
const { hashCompare } = require("../helpers/bcrypts")
const { createToken } = require("../helpers/jsonwebtoken")
const user = require("../models/user")

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

    static async login (req, res, next){
        try {
            const { userLogin, password } = req.body
            const user = await User.findOne({
                where:{
                    [Op.or]:[{userName:userLogin}, {email:userLogin}]
                }
            })
            if(!user){
                throw new Error ("Invalid login, please check your input!")
            }

            const correctPassword = hashCompare(password, user.password)

            if(!correctPassword){
                throw new Error("Invalid Password!")
            }

            const readPayLoad = {
                id:user.id,
                userName:user.userName,
                email:user.email
            }
            const foundName = user.userName
            const access_token = createToken(readPayLoad)

            res.status(200).json({
                message:"Login Success",
                access_token: access_token,
                foundName
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller
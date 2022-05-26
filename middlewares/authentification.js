"use strict"

const { payLoad } = require("../helpers/jsonwebtoken")
const { User } = require("../models")

const authn = async(req, res, next) => {
    try {
        const { access_token } = req.headers
        const readPayLoad = payLoad(access_token)

        const foundUser = await User.findByPk(+readPayLoad.id)
        if(!foundUser){
            throw new Error("Not_Found")
        }
        req.dataUser = {
            id:foundUser.id,
            userName:foundUser.id,
            email:foundUser.email
        }
        next()
    } catch (err) {
        let code = 500
        let msg = "Internal Server Error"

        if(err.name === "JsonWebTokenError" || err.message === "Not_Found"){
            code = 401
            msg = "Invalid Token"
        }

        res.status(code).json({
            message:msg
        })
    }
}

module.exports = authn
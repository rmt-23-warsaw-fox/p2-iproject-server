"use strict";
const {readToken} = require("../helper/jwt")
const {User} = require("../models/index")

async function Authentication(req, res, next) {
    try {
        const read = readToken(req.headers.access_token) 
        const {id, email, username} = read
        const check = await User.findOne({
            where :{
                email,
                username
            }
        })
        if(check===null) {
            throw({name : "Unauthorized"})
        }
        req.Tambahan ={
            id : check.id,
            email : check.email,
            username : check.username
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = Authentication
"use strict";
const axios = require('axios')
const baseURL = "http://localhost:3000"
const { User } = require("../models/index")
const {readHash} = require("../helper/hashPass")
const {createToken} =require("../helper/jwt")

class Controller {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const data = await User.findOne({
                where: {
                    email
                }
            })
            if(data ===null) {
                throw({name : "Invalid username/Password"})
            }
            const compare = readHash(password, data.password)
            if(!compare){
                throw({name : "Invalid username/Password"})
            }
            const payload = {
                id : data.id,
                email : data.email,
                username : data.username
            }
            const access_token = createToken(payload)
            res.status(200).json({
                access_token
            })
        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next) {
        try {
            const {email, password, username} = req.body
            const data = await User.create({
                email,
                password,
                username
            })
            res.status(201).json({
                message: "Successfully registered",
                username: data.username
            })
        } catch (error) {
            next(error)
        }
    }

    static async HomeNews(req, res, next) {
        try {
            const { page = 0 } = req.query
            const search = req.query.name
            const data = await axios({
                method: 'get',
                url: "https://api-berita-indonesia.vercel.app/cnn/terbaru/",
            })
            let length = data.data.data.posts.length
            console.log(length);
            res.status(200).json({
                data: data.data.data.posts,
                pages: Math.ceil(length / 12)
            })
        } catch (error) {
            console.log(error, "<<<<");
        }
    }
}

module.exports = Controller;

"use strict";
const axios = require('axios')
const baseURL = "http://localhost:3000"
const { User, Category, FavoriteNews } = require("../models/index")
const { readHash } = require("../helper/hashPass")
const { createToken } = require("../helper/jwt")

class Controller {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const data = await User.findOne({
                where: {
                    email
                }
            })
            if (data === null) {
                throw ({ name: "Invalid username/Password" })
            }
            const compare = readHash(password, data.password)
            if (!compare) {
                throw ({ name: "Invalid username/Password" })
            }
            const payload = {
                id: data.id,
                email: data.email,
                username: data.username
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
            const { email, password, username } = req.body
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
            const categories = req.body.category
            let news;
            if (categories) {
                news = {
                    method: 'get',
                    url: `${categories}`,
                }
            } else {
                news = {
                    method: 'get',
                    url: `https://api-berita-indonesia.vercel.app/cnn/terbaru/`,
                }
            }
            const data = await axios(news)
            res.status(200).json({
                data: data.data.data.posts,
                // pages: Math.ceil(length / 12)
            })
        } catch (error) {
            next(error)
        }
    }

    static async Favorite(req, res, next) {
        try {
            const {id, username} = req.Tambahan
            const check = await FavoriteNews.findAll({
                where :{
                    UserId : id
                }
            })
            if(check.length<=0){
                throw ({ name: "Your List Empty"})
            }
            res.status(200).json(check)
        } catch (error) {
            next(error)
        }
    }

    static async CategoriesNews(req, res, next) {
        try {
            const data = await Category.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async WeatherMap(req, res, next) {
        try {
            const Place = req.query.place
            const data = await axios({
                method: 'get',
                url: `https://api.openweathermap.org/data/2.5/weather?q=${Place}&units=metric&appid=7fe854b5e2857830feaf29507d862c52`
            })
            res.status(200).json(data.data)
        } catch (error) {
            next(error)
        }
    }

    static async AddFavorites(req, res, next) {
        try {
            const link = req.body.link
            const {id} = req.Tambahan
            const check = await FavoriteNews.findAll({
                where: {
                    UserId : id,
                }
            })
            check.forEach(el=> {
                if(el.LinkId===link){
                    throw ({ name: "Product has been Choice" })
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller;

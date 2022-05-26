"use strict";
const axios = require('axios')
const baseURL = "http://localhost:3000"
const { User, Category, FavoriteNews, NewsAPI, Comment } = require("../models/index")
const { readHash } = require("../helper/hashPass")
const { createToken } = require("../helper/jwt")
const { OAuth2Client } = require('google-auth-library');

class Controller {
    static async LoginGoogle(req, res, next) {
        try {
            const tokenGoogle = req.body.token
            const client = new OAuth2Client("728531124702-580i65icr0hbk2sp7u31l11o2tl3er8e.apps.googleusercontent.com");
            const ticket = await client.verifyIdToken({
                idToken: tokenGoogle,
                audience: "728531124702-580i65icr0hbk2sp7u31l11o2tl3er8e.apps.googleusercontent.com",
            });
            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: payload.email.split("@")[0],
                    password: Math.random().toString(36).substring(2, 7),
                }
            });
            const data = {
                id: user.id,
                email: user.email,
                username: user.username,
            }
            const access_token = createToken(data)
            res.status(200).json({
                statusCode: 200,
                message: "Welcome",
                id: user.id,
                access_token
            })
        } catch (error) {
            next(error)
        }
    }

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
            const { page = 1 } = req.query
            const start = (page - 1) * 15
            const end = page * 15
            const data = await axios({
                method: 'get',
                url: "https://api-berita-indonesia.vercel.app/cnn/terbaru/",
            })
            let limit = data.data.data.posts.slice(start, end)
            let totalperPage = 15
            let pages = Math.ceil(data.data.data.posts.length / totalperPage)

            res.status(200).json({
                pages,
                data: limit,
            })
        } catch (error) {
            next(error)
        }
    }

    static async CategoriesNews(req, res, next) {
        try {
            const params = req.params.categories
            const { page = 1 } = req.query
            const start = (page - 1) * 15
            const end = page * 15
            const data = await axios({
                method: 'get',
                url: `https://api-berita-indonesia.vercel.app/cnn/${params}/`,
            })
            if (!data) {
                throw ({ name: "Data Not Found" })
            }
            let limit = data.data.data.posts.slice(start, end)
            let totalperPage = 15
            let pages = Math.ceil(data.data.data.posts.length / totalperPage)
            res.status(200).json({
                data: limit,
                pages,
            })
        } catch (error) {
            next(error)
        }
    }


    static async Favorite(req, res, next) {
        try {
            const { id, username } = req.Tambahan
            const check = await FavoriteNews.findAll({
                where: {
                    UserId: id
                }
            })
            if (check.length <= 0) {
                throw ({ name: "Your List Empty" })
            }
            res.status(200).json(check)
        } catch (error) {
            next(error)
        }
    }


    static async WeatherMap(req, res, next) {
        try {
            let Place = req.query.place
            const datas = await axios({
                method: 'get',
                url: `https://api.openweathermap.org/data/2.5/weather?q=${Place}&units=metric&appid=7fe854b5e2857830feaf29507d862c52`
            })
            res.status(200).json(datas.data)
        } catch (error) {
            next(error)
        }
    }

    static async getDetailNews(req, res, next) {
        try {
            const params = req.params.categories
            const url = req.body.url
            let link;
            let title;
            let date;
            let description;
            let thumbnail;
            let temp;

            const data = await axios({
                method: 'get',
                url: `https://api-berita-indonesia.vercel.app/cnn/${params}/`
            })
            data.data.data.posts.forEach(el => {
                if (url === el.link) {
                    link = el.link
                    title = el.title,
                        date = el.pubDate,
                        description = el.description,
                        thumbnail = el.thumbnail
                }
            })
            let show = await NewsAPI.findOne({
                where: {
                    link: url
                },
            })
            if (show === null) {
                const create = await NewsAPI.create({
                    link,
                    title,
                    date,
                    description,
                    thumbnail,
                })
                temp = create
            } else {
                temp = show
            }
            res.status(200).json({
                temp
            })
        } catch (error) {
            next(error)
        }
    }

    static async AddFavorites(req, res, next) {
        try {
            const url = req.body.url
            const { title, description, thumbnail } = req.body
            const { id } = req.Tambahan
            const check = await FavoriteNews.findAll({
                where: {
                    UserId: id,
                }
            })
            check.forEach(el => {
                if (el.LinkId === url) {
                    throw ({ name: "Product has been Choice" })
                }
            })
            const pick = await FavoriteNews.create({
                UserId: id,
                LinkId: url,
                title,
                description,
                thumbnail
            })
            res.status(201).json({
                message: "successfully Create"
            })
        } catch (error) {
            next(error)
        }
    }

    static async comment(req, res, next) {
        try {
            const { id } = req.Tambahan
            const url = req.body.url
            const comment = req.body.comment
            console.log(comment);
            if (comment) {
                const data = await Comment.create({
                    textcomment: comment,
                    UserId: id,
                    LinkId: url
                })
            }
            const showComment = await Comment.findAll({
                where: {
                    LinkId: url,
                    UserId: id
                },
                include: [User]
            })
            res.status(200).json(showComment)
        } catch (error) {
            next(error)
        }
    }

    static async Delete(req, res, next) {
        try {
            const LinkId = req.body.url
            const deleted = await FavoriteNews.destroy({
                where: {
                    LinkId
                }
            })
            if (deleted <= 0) {
                throw ({ name: "ID Product Not Found" })
            }
            res.status(200).json({
                message: "Success Erase Your Favorite News"
            })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller;

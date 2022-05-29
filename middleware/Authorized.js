"use strict";
const { FavoriteNews } = require("../models/index")

async function AuthorizationDelete(req, res, next) {
    try {
        const UserId = req.Tambahan.id
        const LinkId = req.body.url
        const check = await FavoriteNews.findOne({
            where: {
                LinkId
            }
        })
        if (check === null) {
            throw ({ name :"ID Product Not Found"})
        }
        if (check.UserId !== UserId) {
            throw ({ name:"NOT_ALLOWED"})
        }
        next()
    } catch (error) {
        next(error)

    }
}

module.exports = AuthorizationDelete
"use strict";
const {Genre} = require("../models/index");
class GenreController{
    static async getGenres(req, res, next){
        try {
            const genres = await Genre.findAll();
            res.status(200).json({
                data: genres
            })
        } catch (err) {
            next(err);
        }
    }
}
module.exports = GenreController;
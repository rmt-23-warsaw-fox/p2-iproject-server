const { Type } = require('../models');

class TypeController {
    static async fetchTypes(req, res, next) {
        try {
            const types = await Type.findAll();
            res.status(200).json(types)
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    
}

module.exports = TypeController
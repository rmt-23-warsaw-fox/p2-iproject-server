const { Wishlist, Accomodation } = require('../models');

class WishlistController {
    static async addToWishlist(req, res, next) {
        try {
            const { AccomodationId, UserId } = req.body;
            const [accomodation, created] = await Wishlist.findOrCreate({
                where: { AccomodationId, UserId },
            });

            if (!created) {
                throw { name: "ACCOMODATION_ALREADY_EXIST" }
            }

            res.status(201).json({
                message: `Successfully added to wishlist`
            })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = WishlistController
const { Wishlist, Accomodation, Type } = require('../models');
const wishlist = require('../models/wishlist');

class WishlistController {
    static async addToWishlist(req, res, next) {
        try {
            const UserId = req.currentUser.id;
            const { AccomodationId, TypeId } = req.body;
            const [accomodation, created] = await Wishlist.findOrCreate({
                where: { AccomodationId, UserId },
                defaults: {
                    TypeId: TypeId
                }
            });

            if (!created) {
                throw { name: "ACCOMODATION_ALREADY_EXIST" }
            }

            res.status(201).json({
                message: `Successfully added to wishlist`
            })
        } catch (err) {
            next(err)
        }
    }

    static async fetchWishlist(req, res, next) {
        try {
            const userId = req.currentUser.id;
            const wishlist = await Wishlist.findAll({
                where : { UserId : +userId },
                include: [
                    {
                        model: Type,
                        attributes: ['name']
                    },
                    {
                        model: Accomodation,
                    }
                ],
                attributes: { exclude: ['updatedAt', 'createdAt'] }
            })

            res.status(200).json(wishlist)
        } catch (err) {
            next(err)
        }
    }

    static async deleteWishlist(req, res, next) {
        try {
            const { id } = req.params;
            const deletedWishlist = await Wishlist.destroy({
                where: { id }
            })

            if (!deletedWishlist) {
                throw { name: "WISHLIST_NOT_FOUND" }
            }

            res.status(200).json({
                message: "Successfully deleted from wishlist"
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = WishlistController
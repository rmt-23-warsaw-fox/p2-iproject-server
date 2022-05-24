const wishlistRoutes = require("express").Router();
const WishlistController = require('../controllers/wishlistController');

wishlistRoutes.post('/add', WishlistController.addToWishlist);
wishlistRoutes.get('/:userId', WishlistController.fetchWishlist);
wishlistRoutes.delete('/:id', WishlistController.deleteWishlist);


module.exports = wishlistRoutes
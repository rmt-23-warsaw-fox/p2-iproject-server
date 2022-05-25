const wishlistRoutes = require("express").Router();
const WishlistController = require('../controllers/wishlistController');

wishlistRoutes.get('/', WishlistController.fetchWishlist);
wishlistRoutes.post('/add', WishlistController.addToWishlist);
wishlistRoutes.delete('/:id', WishlistController.deleteWishlist);


module.exports = wishlistRoutes
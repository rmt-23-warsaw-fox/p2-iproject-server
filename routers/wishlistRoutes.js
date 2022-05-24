const wishlistRoutes = require("express").Router();
const WishlistController = require('../controllers/wishlistController');

wishlistRoutes.post('/add', WishlistController.addToWishlist);

module.exports = wishlistRoutes
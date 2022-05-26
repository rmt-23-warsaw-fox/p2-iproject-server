const wishlistRoutes = require("express").Router();
const WishlistController = require('../controllers/wishlistController');

wishlistRoutes.get('/', WishlistController.fetchWishlist);
wishlistRoutes.post('/add', WishlistController.addToWishlist);
wishlistRoutes.post("/payment", WishlistController.payment)
wishlistRoutes.post("/add-transaction", WishlistController.addTransaction)
wishlistRoutes.get("/transactions", WishlistController.fetchTransactions)
wishlistRoutes.post('/payment-status', WishlistController.updatePaymentStatus)
wishlistRoutes.delete('/:id', WishlistController.deleteWishlist);

module.exports = wishlistRoutes
const routes = require("express").Router();
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const accomodationRoutes = require('./accomodationRoutes');
const typeRoutes = require('./typeRoutes');
const wishllistRoutes = require('./wishlistRoutes');

routes.use("/admin", adminRoutes);
routes.use("/accomodation", accomodationRoutes);
routes.use("/type", typeRoutes);

routes.use("/public/user", userRoutes)
routes.use("/public/wishlist", wishllistRoutes)

module.exports = routes;
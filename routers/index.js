const routes = require("express").Router();
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const accomodationRoutes = require('./accomodationRoutes');
const typeRoutes = require('./typeRoutes');
const wishlistRoutes = require('./wishlistRoutes');
const accomodationUserRoutes = require('./accomodationUserRoutes');

const { authnUser } = require('../middlewares/authnUser');

routes.use("/admin", adminRoutes);
routes.use("/accomodation", accomodationRoutes);
routes.use("/type", typeRoutes);

routes.use("/public/user", userRoutes)
// routes.use("/public/wishlist", authnUser, wishlistRoutes)
routes.use("/public/accomodation", accomodationUserRoutes);

module.exports = routes;
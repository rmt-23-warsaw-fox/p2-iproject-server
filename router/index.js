const express = require("express");
const router = express.Router();
const userRoutes=require('./users.js');
const postRoutes=require('./posts.js');
const favouriteRoutes=require('./favourites.js');
const {userAuthorization} = require("../middleware/postAuthorization");
const Controller = require('../controller/controller')
router.use("/users", userRoutes);
router.use("/post", postRoutes);
router.use("/favourites", favouriteRoutes);

router.get("/history",Controller.getHistory);

module.exports = router;
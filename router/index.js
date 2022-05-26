const express = require("express");
const router = express.Router();
const userRoutes=require('./users.js');
const postRoutes=require('./posts.js');
const favouriteRoutes=require('./favourites.js');
const chatRoutes=require('./chats.js');
const authentication = require("../middleware/authentication");
const Controller = require('../controller/controller')
router.use("/users", userRoutes);
router.use("/post", postRoutes);
router.use("/favourites", favouriteRoutes);
router.use("/chats", chatRoutes);

router.use(authentication);

router.get("/history",Controller.getHistory);

module.exports = router;
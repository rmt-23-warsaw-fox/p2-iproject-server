"use strict"

const express = require("express");
const router = express.Router();
const Controller = require("../controller/chat");
const authentication = require("../middleware/authentication");

router.use(authentication);
router.get("/:id", Controller.getChat);
router.get("/:id/favourite", Controller.getChat);

router.post("/:id", Controller.addChat);
router.post("/:id/favourite", Controller.addFavourite);
router.delete("/:id/favourite", Controller.removeFavourite);

module.exports = router;
"use strict"

const express = require("express");
const router = express.Router();
const Controller = require("../controller/post");
const authentication = require("../middleware/authentication");

router.use(authentication);
router.get("/", Controller.listFavourite);
router.post("/:id", Controller.addFavourite);
router.delete("/:id", Controller.removeFavourite);

module.exports = router;
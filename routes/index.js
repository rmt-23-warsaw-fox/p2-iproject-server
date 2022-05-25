"use strict";

const express = require("express");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();
const movie = require("./movie");
const user = require("./user");
const seat = require("./seat");

router.use("/movies", movie);
router.use("/users", user);
router.use(authentication);
router.use("/seats", seat);

module.exports = router;

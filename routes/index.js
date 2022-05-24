"use strict";

const express = require("express");
const router = express.Router();
const movie = require("./movie");
const user = require("./user");

router.use("/movies", movie);
router.use("/users", user);

module.exports = router;

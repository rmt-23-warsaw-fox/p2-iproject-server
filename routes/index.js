"use strict"
const express = require("express")
const router = express.Router()
const user = require("./userRoutes")
router.use("/users", user)

module.exports = router

"use strict"
const express = require("express")
const { authN } = require("../middlewares/authn")
const router = express.Router()
const user = require("./userRoutes")
const dota = require("./dotaRoutes")

router.use("/users", user)
router.use(authN)
router.use("/dota", dota)

module.exports = router

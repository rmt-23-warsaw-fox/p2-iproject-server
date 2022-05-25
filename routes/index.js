"use strict"
const express = require("express")
const { authN } = require("../middlewares/authn")
const router = express.Router()
const user = require("./userRoutes")

router.use("/users", user)
router.use(authN)
module.exports = router

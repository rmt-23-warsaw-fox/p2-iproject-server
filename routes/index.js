"use strict"

const express = require("express")
const router = express.Router()
const errorHandlres = require("../middlewares/errorHandlers")

router.post("/register", (req, res) => {
    res.send("login")
})
router.post("/login", (req, res) => {
    res.send("login")
})

router.use(errorHandlres)


module.exports = router
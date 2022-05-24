"use strict"

const express = require("express")
const router = express.Router()

router.post("/register", (req, res) => {
    res.send("login")
})
router.post("/login", (req, res) => {
    res.send("login")
})


module.exports = router
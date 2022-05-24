"use strict"

const express = require("express")
const Controller = require("../controllers")
const router = express.Router()
const errorHandlres = require("../middlewares/errorHandlers")

router.post("/register", Controller.register)
router.post("/login", Controller.login)

router.use(errorHandlres)


module.exports = router
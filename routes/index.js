"use strict"

const express = require("express")
const router = express.Router()
const Controller = require("../controllers")
const errorHandlres = require("../middlewares/errorHandlers")
const authn = require("../middlewares/authentification")

router.post("/register", Controller.register)
router.post("/login", Controller.login)

router.use(authn)
router.post("/profiles", Controller.createProfile)
router.get("/profiles", Controller.getProfile)
router.put("/profiles", Controller.editProfile)
router.post("/upload", Controller.createContent)
router.get("/content", Controller.getContent)
router.delete("/content/:id", Controller.deleteContent)

router.use(errorHandlres)


module.exports = router
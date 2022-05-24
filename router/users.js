"use strict"

const express = require("express");
const router = express.Router();
const Controller = require("../controller/user");

//router.get("/", Controller.landingPage);
//router.get("/login", Controller.login);
router.post("/login", Controller.login);
router.post("/loginGoogle", Controller.loginGoogle);

//router.get("/register", Controller.register);
router.post("/register", Controller.register);
router.get("/", Controller.list);
//router.get("/logout",Controller.logout);

module.exports = router;
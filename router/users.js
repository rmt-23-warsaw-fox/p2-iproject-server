"use strict"

const express = require("express");
const router = express.Router();
const Controller = require("../controller/user");
const ControllerEmail = require("../controller/controller");
const authentication = require("../middleware/authentication");

//router.get("/", Controller.landingPage);
//router.get("/login", Controller.login);
router.post("/login", Controller.login);
router.post("/loginGoogle", Controller.loginGoogle);

// router.get('/mail/user/:email',ControllerEmail.getUser)
// router.get('/mail/send',ControllerEmail.sendMail);
// router.get('/mail/drafts/:email', ControllerEmail.getDrafts);
// router.get('/mail/read/:messageId', ControllerEmail.readMail);

//router.get("/register", Controller.register);
router.post("/register", Controller.register);
router.use(authentication);
router.get("/buy", Controller.getPrices);
router.post("/buy", Controller.buyCoin);

router.post("/setPrice", Controller.setPrice);

router.get("/", Controller.list);
//router.get("/logout",Controller.logout);

module.exports = router;
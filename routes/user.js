const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// user login
router.post("/login", userController.login);

// user register
router.post("/register", userController.register);

module.exports = router;

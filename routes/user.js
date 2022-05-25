const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// user login
router.post("/login");

// user register
router.post("/register", userController);

module.exports = router;

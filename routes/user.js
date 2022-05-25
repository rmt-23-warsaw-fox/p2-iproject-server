const express = require("express");
const router = express.Router();

// user login
router.get("/", (req, res) => {
  res.send("Birds home page");
});

// user register
router.get("/about", (req, res) => {
  res.send("About birds");
});

module.exports = router;

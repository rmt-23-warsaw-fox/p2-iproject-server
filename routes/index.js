const express = require("express");
const router = express.Router();
const user = require("./user");

// route to user
router.use("/", user);

// define the about route
router.get("/about", (req, res) => {
  res.send("About birds");
});

module.exports = router;

const express = require("express");
const router = express.Router();
const authRoute = require("./auth");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

router.use("/auth", authRoute);

module.exports = router;

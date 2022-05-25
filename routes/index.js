const express = require("express");
const router = express.Router();
const authRoute = require("./auth");
const gadgetsRoute = require("./gadgets");
const paymentRoute = require("./payment");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});
router.use("/auth", authRoute);
router.use("/gadgets", gadgetsRoute);
router.use("/payment", paymentRoute);

module.exports = router;

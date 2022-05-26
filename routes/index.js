const express = require("express");
const router = express.Router();
const authRoute = require("./auth");
const gadgetsRoute = require("./gadgets");
const paymentRoute = require("./payment");
const transactionRoute = require("./transaction-history");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});
router.use("/auth", authRoute);
router.use("/gadgets", gadgetsRoute);
router.use("/payment", paymentRoute);
router.use("/transaction-history", transactionRoute);

module.exports = router;

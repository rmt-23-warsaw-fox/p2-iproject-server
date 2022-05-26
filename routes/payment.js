const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment-controller");
const authentication = require("../middlewares/authentication");

// router.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Welcome to the API",
//   });
// });

router.use(authentication);
router.post("/", paymentController.createPayment);
router.post("/success", paymentController.successPayment);

module.exports = router;

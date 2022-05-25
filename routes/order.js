const express = require("express");
const orderController = require("../controllers/orderController");
const isLoggedIn = require("../middlewares/authN");
const isAdmin = require("../middlewares/authZ");

const router = express.Router();

// get order
// admin
router.use(isLoggedIn);
router.get("/", isAdmin, orderController.getOrder);

// user
router.patch("/", orderController.payOrder);
router.post("/user", orderController.createOrder);
router.get("/user", orderController.userOrder);

module.exports = router;

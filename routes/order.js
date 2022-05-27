const express = require("express");
const orderController = require("../controllers/orderController");
const isLoggedIn = require("../middlewares/authN");
const isAdmin = require("../middlewares/authZ");
const router = express.Router();

router.post("/notification", orderController.notification);
// get order
// admin
router.use(isLoggedIn);
router.get("/", isAdmin, orderController.getOrder);

// user
router.post("/add/:ProductId", orderController.createOrder);
router.get("/myorder", orderController.userOrder);
router.get("/va/:orderCode", orderController.getVa);

router.post("/charge/:orderCode", orderController.charge);

module.exports = router;

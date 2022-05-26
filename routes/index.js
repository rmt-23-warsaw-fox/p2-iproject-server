const express = require("express");
const router = express.Router();
const user = require("./user");
const product = require("./product");
const category = require("./category");
const order = require("./order");
const { errorHandler } = require("../middlewares/errorHandler");

// route to user
router.use("/users", user);
// route to product
router.use("/products", product);
// route to category
router.use("/categories", category);
// route to order
router.use("/orders", order);

router.use(errorHandler);

module.exports = router;

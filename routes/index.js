const express = require("express");
const router = express.Router();
const user = require("./user");
const product = require("./product");
const category = require("./category");
const { errorHandler } = require("../middlewares/errorHandler");

// route to user
router.use("/users", user);
// route to product
router.use("/products", product);
// route to category
router.use("/categories", category);

router.use(errorHandler);

module.exports = router;

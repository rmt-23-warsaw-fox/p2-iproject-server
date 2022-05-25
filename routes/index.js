const express = require("express");
const router = express.Router();
const user = require("./user");
const product = require("./product");
const { errorHandler } = require("../middlewares/errorHandler");

// route to user
router.use("/users", user);
// route to product
router.use("/products", product);

router.use(errorHandler);

module.exports = router;

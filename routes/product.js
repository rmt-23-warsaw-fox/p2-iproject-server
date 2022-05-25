const express = require("express");
const productController = require("../controllers/productController");
const isLoggedIn = require("../middlewares/authN");
const isAdmin = require("../middlewares/authZ");

const router = express.Router();

// get product
router.get("/", productController.getProduct);
router.use(isLoggedIn, isAdmin);
router.post("/", productController.addProduct);
router.put("/:id", productController.updateProduct);
router.patch("/:id", productController.updateStock);
router.delete("/:id", productController.deleteProduct);

module.exports = router;

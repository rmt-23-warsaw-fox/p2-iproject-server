const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

// get category
router.get("/", categoryController.getCategory);

module.exports = router;

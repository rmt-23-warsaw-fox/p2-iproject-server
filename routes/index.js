const express = require("express");
const errorHandler = require("../middlewares/errHandler");
const public = require("./public");
const router = express.Router();

router.use("/public", public);
router.use(errorHandler);
module.exports = router;

const express = require("express");
const errorHandler = require("../middlewares/errHandler");
const public = require("./public");
const xendit = require("./xendit");
const router = express.Router();

router.use("/public", public);
router.use("/xendit", xendit);
router.use(errorHandler);
module.exports = router;

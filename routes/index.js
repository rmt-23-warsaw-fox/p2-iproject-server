const express = require("express");
const isLogin = require("../middlewares/authn");
const errorHandler = require("../middlewares/errHandler");
const public = require("./public");
const xendit = require("./xendit");
const router = express.Router();

router.use("/public", public);
router.use(isLogin);
router.use("/xendit", xendit);
router.use(errorHandler);
module.exports = router;

const express = require("express");
const public = require("./public");
const router = express.Router();

router.use("/public", public);
module.exports = router;

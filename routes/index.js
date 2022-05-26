const express = require("express");
const router = express.Router();
const customer = require("./customer");
const event = require("./event");

router.use("/customers", customer);
router.use("/events", event);

module.exports = router;

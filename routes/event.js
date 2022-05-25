const express = require("express");
const router = express.Router();
// const eventController = require("../controllers/eventController");
const authentication = require("../middlewares/authentication");

router.get("/", eventController.eventList);
router.get("/master-list", eventController.eventMasterList);
router.patch("/hands/:EventId", authentication, eventController.patchHands);

module.exports = router;

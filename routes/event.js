const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.get("/", eventController.eventList);
router.get("/master-list", eventController.eventMasterList);
router.patch(
  "/hands/:EventId",
  authentication,
  authorization,
  eventController.patchHands
);

module.exports = router;

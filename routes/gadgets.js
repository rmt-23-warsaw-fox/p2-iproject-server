const express = require("express");
const router = express.Router();
const gadgetsController = require("../controllers/gadgets-controller");

router.get("/dashboard", gadgetsController.getGadgetsForDashboard);
router.get("/detail/:detail", gadgetsController.getGadget);
router.get("/:brands", gadgetsController.getGadgets);

module.exports = router;

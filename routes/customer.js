const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const authentication = require("../middlewares/authentication");

router.post("/register", customerController.register);
router.post("/login", customerController.login);
router.get("/history", authentication, customerController.historyList);
router.post(
  "/before-transaction",
  authentication,
  customerController.beforeTransaction
);
router.patch(
  "/after-transaction",
  authentication,
  customerController.afterTransaction
);

module.exports = router;

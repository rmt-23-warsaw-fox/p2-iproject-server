const express = require("express");
const router = express.Router();
const TransactionHistoryController = require("../controllers/transaction-history-controller");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/", TransactionHistoryController.getTransactionHistory);

module.exports = router;

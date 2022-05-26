const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const coinRouter = require("./coin");
const { authn } = require("../middleware/authn");

router.use("/users", userRouter);
router.use(authn);
router.use("/coins", coinRouter);
module.exports = router;

const express = require("express");
const router = express.Router();
const userRouter = require('./user')
const coinRouter = require('./coin')

router.use('/users', userRouter)
router.use('/coins', coinRouter)
module.exports = router;
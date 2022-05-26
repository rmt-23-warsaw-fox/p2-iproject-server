const express = require('express');
const router = express.Router();

router.use('/users', require('./user'));
router.use("/genres", require("./genre"));
router.use("/music", require("./music"));
module.exports = router;
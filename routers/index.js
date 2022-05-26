const express = require('express');
const router = express.Router();

router.use('/users', require('./user'));
router.use("/genres", require("./genre"));
router.use(require("../middlewares/authenticate"));
router.use("/music", require("./music"));
router.use('/favorites', require('./favorite'));

module.exports = router;
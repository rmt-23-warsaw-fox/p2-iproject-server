let express = require('express');
let router = express.Router();
const users = require('./users');
const payment = require('./payment');

router.use('/users', users);
router.use('/payment', payment);

module.exports = router;

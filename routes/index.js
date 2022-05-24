let express = require('express');
let router = express.Router();
const users = require('./users');

router.use('/user', users);

module.exports = router;

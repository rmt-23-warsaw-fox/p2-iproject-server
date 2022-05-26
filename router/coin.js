const express = require("express");
const router = express.Router();
const Controller = require('../controllers/coin')

router.get('/', Controller.getCoin)
// router.get('/search',)

module.exports = router
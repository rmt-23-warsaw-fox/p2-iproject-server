const express = require("express");
const router = express.Router();
const Controller = require('../controllers/coin')
const ControllerBook = require('../controllers/bookmark');

router.get('/', Controller.getCoin)
router.post('/add', ControllerBook.addBook)
router.get('/mycoins', ControllerBook.getMyCoins)
router.get('/news', Controller.getNews)
router.delete('/mycoins', ControllerBook.delete)
router.put('/mycoins', ControllerBook.putcoins)

module.exports = router
const express = require('express');
const Music = require("../controllers/music");
const router = express.Router();
router.post('/',require("../middlewares/authenticate"),Music.uploadMusic);
router.get('/', Music.getMusic);
router.get('/:id');

module.exports = router;
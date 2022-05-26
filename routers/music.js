const express = require('express');
const Music = require("../controllers/music");
const router = express.Router();
router.post('/',Music.uploadMusic);
router.get('/', Music.getMusic);
router.get('/:id');

module.exports = router;
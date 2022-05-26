const express = require('express');
const Music = require("../controllers/music");
const router = express.Router();
router.post('/',require("../middlewares/authenticate"),Music.uploadMusic);
router.get('/', Music.getMusic);
router.get('/:id', Music.getMusicById);
router.get('/personal',require("../middlewares/authenticate"),Music.getUserSong);
router.post('/comments/:id', require("../middlewares/authenticate"), Music.publishComment);
router.get('/comments/:id', Music.getComments);

module.exports = router;
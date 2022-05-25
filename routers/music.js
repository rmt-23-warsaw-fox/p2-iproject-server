const express = require('express');
const MusicController = require("../controllers/music");
const router = express.Router();
const multer = require('multer');
const upload = multer();

const songUpload = upload.fields([{name: 'songCover', maxCount: 1}, {name: 'song', maxCount:1}]);

router.post('/',songUpload, MusicController.uploadMusic);
router.get('/');
router.get('/:id');

module.exports = router;
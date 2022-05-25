const express = require('express');
const UserController = require('../controllers/user');
const multer = require('multer');
const upload = multer();
const router = express.Router();

router.post('/register', upload.single('Profile_Picture') ,UserController.register);
router.post('/login', UserController.login);

module.exports = router;
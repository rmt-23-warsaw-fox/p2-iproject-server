const express = require('express')
const router = express.Router()
const {auth} = require('../middlewares/authentication.js')
const {PostController} = require('../controllers/postController.js')

router.use(auth)

router.post('/', PostController.addPost)

module.exports = router
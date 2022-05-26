const express = require('express')
const router = express.Router()
const {auth} = require('../middlewares/authentication.js')
const {PostController} = require('../controllers/postController.js')

router.get('/', PostController.fetchPosts)

router.use(auth)

router.post('/', PostController.addPost)
router.delete('/:id', PostController.deletePost)

module.exports = router
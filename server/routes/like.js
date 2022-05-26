const express = require('express')
const router = express.Router()
const {auth} = require('../middlewares/authentication.js')
const {LikeController} = require('../controllers/likeController')

router.use(auth)

router.post('/', LikeController.addLike)
router.delete('/:id', LikeController.unlike)

module.exports = router
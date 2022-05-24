const express = require('express')
const ProductController = require('../controllers/products')
const router = express.Router()

router.get('/', ProductController.products)
router.get('/genres', ProductController.genre)
router.get('/:id/detail', ProductController.id)
module.exports = router
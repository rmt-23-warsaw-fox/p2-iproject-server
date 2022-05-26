const express = require('express')
const ProductController = require('../controllers/packageController')
const router = express.Router()

router.get('/', ProductController.products)
router.get('/majors', ProductController.major)
router.get('/:id/detail', ProductController.id)

module.exports = router

const express = require('express')
const PackageController = require('../controllers/packageController')
const router = express.Router()

router.get('/listBuy', PackageController.listBuy)
router.post('/:id/buy', PackageController.buy)
router.delete('/:id/deleteBuy', PackageController.deleteBuy)

module.exports = router


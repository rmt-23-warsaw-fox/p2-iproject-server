
const express = require('express')
const PackageController = require('../controllers/packageController')
const router = express.Router()

router.post('/:id/favourite', PackageController.favourite)
router.get('/listFavourite', PackageController.listFavourite)
module.exports = router


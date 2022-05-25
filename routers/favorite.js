const express = require('express');
const router = express.Router();

router.get('/');
router.delete('/:id');

module.exports = router;
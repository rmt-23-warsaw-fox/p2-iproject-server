let express = require('express');
let router = express.Router();
const Authentication = require('../middlewares/Authentication');
const Controller = require('../controllers/payment');

router.use(Authentication);
router.post('/', Controller.transaction);
module.exports = router;

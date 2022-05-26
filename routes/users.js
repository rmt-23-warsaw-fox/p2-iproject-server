let express = require('express');
let router = express.Router();
const Authentication = require('../middlewares/Authentication');
const Controller = require('../controllers/user');

router.get('/', Controller.showAllUser);
router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.use(Authentication);
router.patch('/payment', Controller.updateMembership);

module.exports = router;

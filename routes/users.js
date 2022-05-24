let express = require('express');
let router = express.Router();
const Controller = require('../controllers/user');

router.get('/', Controller.showAllUser);
router.post('/register', Controller.register);
router.post('/login', Controller.login);

module.exports = router;

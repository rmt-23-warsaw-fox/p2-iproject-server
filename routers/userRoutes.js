const userRoutes = require("express").Router();
const UserController = require('../controllers/userController');

userRoutes.post('/login', UserController.login)

module.exports = userRoutes
const userRoutes = require("express").Router();
const UserController = require('../controllers/userController');

userRoutes.post('/login', UserController.login)
userRoutes.post("/register", UserController.register)
userRoutes.get("/getuserprofile", UserController.getUserProfile)

module.exports = userRoutes
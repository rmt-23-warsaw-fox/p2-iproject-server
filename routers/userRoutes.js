const userRoutes = require("express").Router();
const UserController = require('../controllers/userController');

userRoutes.post('/login', UserController.login)
userRoutes.post("/register", UserController.register)
userRoutes.post("/signin-with-google", UserController.loginGoogle)
userRoutes.get("/getuserprofile", UserController.getUserProfile)

module.exports = userRoutes
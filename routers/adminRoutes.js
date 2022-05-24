const adminRoutes = require("express").Router();
const AdminController = require('../controllers/adminController');

adminRoutes.post("/register", AdminController.register)
adminRoutes.post("/login", AdminController.login)

module.exports = adminRoutes
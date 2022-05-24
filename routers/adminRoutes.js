const adminRoutes = require("express").Router();
const AdminController = require('../controllers/adminController');

adminRoutes.post("/register", AdminController.register)

module.exports = adminRoutes
const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controllerUser");

router.get("/", Controller.user);
router.post("/register/admins", Controller.registerAdmin);
router.post("/register/customers", Controller.registerCustomer);
router.post("/login", Controller.login);
router.post("/loginGoogle", Controller.loginGoogle);

module.exports = router;

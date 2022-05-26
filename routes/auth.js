const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const authentication = require("../middlewares/authentication");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/check-token", authController.checkToken);
router.put("/update-profile", authentication, authController.updateProfile);

module.exports = router;

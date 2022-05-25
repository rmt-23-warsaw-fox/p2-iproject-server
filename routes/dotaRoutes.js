const express = require("express")
const DotaController = require("../controllers/dotaController")
const router = express.Router()

router.get("/matches", DotaController.getMatches)
// router.post("/login", DotaController.login)

module.exports = router

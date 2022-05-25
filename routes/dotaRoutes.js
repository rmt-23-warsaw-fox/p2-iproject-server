const express = require("express")
const DotaController = require("../controllers/dotaController")
const router = express.Router()

router.get("/matches", DotaController.getMatches)
router.get("/teams", DotaController.getTeams)
router.get("/teams/:teamId", DotaController.getTeam)

module.exports = router

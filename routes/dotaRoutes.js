const express = require("express")
const DotaController = require("../controllers/dotaController")
const router = express.Router()

router.get("/matches", DotaController.getMatches)
router.get("/teams", DotaController.getTeams)
router.get("/teams/:teamId", DotaController.getTeam)
router.get("/player/:id", DotaController.getPlayer)

module.exports = router

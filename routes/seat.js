const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controllerSeats");

router.get("/", Controller.checkSeats);
router.get("/rows", Controller.rows);
router.get("/booking", Controller.bookedSeats);
router.post("/booking/:MovieId", Controller.booking);

module.exports = router;

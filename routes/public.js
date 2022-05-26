const express = require("express");
const public = express.Router();
const PublicController = require("../controllers/publicControllers");

public.post("/register");
public.post("/login");

module.exports = public;

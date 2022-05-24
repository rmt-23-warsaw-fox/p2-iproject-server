const express = require("express");
const public = express.Router();

public.post("/register");
public.post("/login");

module.exports = public;

const express = require("express");
const public = express.Router();
const PublicController = require("../controllers/publicControllers");
const isLogin = require("../middlewares/authn");

public.post("/register", PublicController.registerCustomer);
public.post("/login", PublicController.loginCustomer);
public.get("/foods", PublicController.getAllFoods);
public.use(isLogin);
public.post("/bookmarks", PublicController.addBookmarks);
public.get("/bookmarks", PublicController.getBookmarks);
public.get("/chefs", PublicController.getAllChef);
public.post("/orders", PublicController.addOrder);

module.exports = public;

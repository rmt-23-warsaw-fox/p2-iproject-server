"use strict"

const express = require("express");
const router = express.Router();
const Controller = require("../controller/post");
const authentication = require("../middleware/authentication");
const {postAuthorization} = require("../middleware/postAuthorization");

router.use(authentication);
router.get("/", Controller.list);
router.get("/:id", Controller.detail);

router.post("/", Controller.add);
router.post("/type", Controller.addType);
router.get("/type", Controller.listType);
router.delete("type/:id",Controller.deleteType);
router.put("/:id",postAuthorization,Controller.update);
router.get("/list",postAuthorization,Controller.listOwn);
router.put("/:id/hide",postAuthorization,Controller.update);
router.put("/:id/follower",postAuthorization,Controller.update);
router.delete("/:id",postAuthorization,Controller.delete);


module.exports = router;
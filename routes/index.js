const express = require("express");
const reviewController = require("../controllers/reviewController");
const router = express.Router();
const userController = require("../controllers/userController");
const authN = require("../middlewares/authN");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/reviews", reviewController.getAllReview);

router.use(authN);

router.get("/reviews/user/:id", reviewController.getReviewUser);
router.post("/reviews/add/:MovieId", reviewController.postReview);
router.get("/reviews/detail/:id", reviewController.reviewDetail);
router.patch("/reviews/edit/:MovieId", reviewController.editReview);
router.delete("/reviews/:id", reviewController.deleteReview);

module.exports = router;

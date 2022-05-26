const { Review } = require("../models");

class reviewController {
  static async postReview(req, res, next) {
    try {
      const { review } = req.body;
      const { MovieId } = req.params;

      const postReeview = await Review.create({
        UserId: +req.additionalData.id,
        MovieId: +MovieId,
        review,
      });

      res.status(201).json({
        review: postReeview.review,
      });
    } catch (error) {
      res.status(403).json(error);
    }
  }

  static async getAllReview(req, res, next) {
    try {
      const allReviews = await Review.findAll();

      res.status(200).json(allReviews);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getReviewUser(req, res, next) {
    try {
      const { id } = req.params;
      const allReviews = await Review.findAll({
        where: {
          id,
        },
      });

      res.status(200).json(allReviews);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async editReview(req, res, next) {
    try {
      const { id } = req.params;
      const { review } = req.body;

      const reviewPost = await Review.update(
        {
          review,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(201).json(reviewPost);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async reviewDetail(req, res, next) {
    try {
      const { id } = req.params;
      const review = await Review.findById(id);

      if (!review) {
        throw new Error({ name: "review not found", message: "Review not found" });
      }
      res.status(200).json({ review });
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  static async deleteReview(req, res, next) {
    try {
      const { id } = req.params;

      const deletedReview = await Review.destroy({
        where: {
          id: +id,
        },
      });

      if (!deletedReview) {
        throw new Error({ name: "review not found", message: "Review not found" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

module.exports = reviewController;

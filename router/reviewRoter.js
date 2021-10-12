const express = require("express");
const router = express.Router();
const userAutcontroller = require("../middleware/authentication");
const reviewController = require("../controller/reviewController");

router.post(
  "/add",
  userAutcontroller.requireSignin,
  reviewController.addReview
);
router.get(
  "/:id",
  userAutcontroller.requireSignin,
  reviewController.getReviewByAnimeId
);
router.delete(
  "/:id",
  userAutcontroller.requireSignin,
  reviewController.DelteReviewByReviewId
);
router.put(
  "/:id",
  userAutcontroller.requireSignin,
  reviewController.updateReviewByReviewId
);

module.exports = router;

const express = require("express");
const router = express.Router();
const userAutcontroller = require("../middleware/authentication");
const ratingController = require("../controller/ratingController");

router.post(
  "/add",
  userAutcontroller.requireSignin,
  ratingController.addRating
);
router.get(
  "/:id",
  userAutcontroller.requireSignin,
  ratingController.getRatingByAnimeId
);
router.delete(
  "/:id",
  userAutcontroller.requireSignin,
  ratingController.DelteRatingByRatingId
);
router.put(
  "/:id",
  userAutcontroller.requireSignin,
  ratingController.updateRatingByRatingId
);

module.exports = router;

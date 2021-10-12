const mongoose = require("mongoose");
const RatingSchema = new mongoose.Schema(
  {
    // like can be fecth by userid length
    animeId: {
      type: Number,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    rating: {
      type: Number,
      max: [5, "Number should be less than or Equal to 5 "],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Rating", RatingSchema);

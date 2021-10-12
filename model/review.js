const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema(
  {
    animeId: {
      type: Number,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    review: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Review", ReviewSchema);

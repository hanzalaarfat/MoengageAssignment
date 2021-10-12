const Review = require("../model/review");

exports.addReview = async (req, res) => {
  try {
    const { userId, animeId, review } = req.body;

    if (!userId || !animeId || !review) {
      return res.status(422).json({ err: "plz filled data properly" });
    }
    const reviewObj = new Review({
      userId,
      animeId,
      review,
    });
    const data = await reviewObj.save();
    console.log(data);

    if (data) {
      return res.status(200).json({
        success: true,
        message: "anime review added successfully",
        data: data,
      });
    }

    return res.status(200).json({
      success: false,
      message: "anime review not added plz try again..",
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "anime review not added plz try again",
      err,
    });
  }
};

exports.getReviewByAnimeId = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await Review.find({ animeId: id });
    if (data) {
      return res.status(200).json({
        success: true,
        message: `All review On Anime id: ${id}`,
        data: data,
      });
    }
    return res.status(200).json({
      success: false,
      message: "anime review not get data",
      err,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "anime review not get data",
      err,
    });
  }
};

exports.updateReviewByReviewId = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await Review.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidator: true,
      useFindAndModify: false,
    });
    if (data) {
      return res.status(200).json({
        success: true,
        message: `Anime review successfully updated`,
        data: data,
      });
    }
    return res.status(200).json({
      success: false,
      message: "anime review not updated",
      err,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "anime review not updated",
      err,
    });
  }
};

exports.DelteReviewByReviewId = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Review.findOneAndDelete({ _id: id });
    if (data) {
      return res.status(200).json({
        success: true,
        message: `Anime review deleted`,
        data: data,
      });
    }
    return res.status(200).json({
      success: false,
      message: "anime review not deleted",
      err,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "anime review not deleted",
      err,
    });
  }
};

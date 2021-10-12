const Rating = require("../model/rating");

exports.addRating = async (req, res) => {
  try {
    const { userId, animeId, rating } = req.body;

    if (!userId || !animeId || !rating) {
      return res.status(422).json({ err: "plz filled data properly" });
    }
    const ratingObj = new Rating({
      userId,
      animeId,
      rating,
    });
    const data = await ratingObj.save();
    if (data) {
      return res.status(200).json({
        success: true,
        message: "anime rating added successfully",
        data: data,
      });
    }

    return res.status(200).json({
      success: false,
      message: "anime rating not added plz try again..",
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "anime rating not added plz try again",
      err,
    });
  }
};

exports.getRatingByAnimeId = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await Rating.find({ animeId: id });

    if (!data) {
      return res.status(200).json({
        success: false,
        message: "anime rating not get data...",
        err,
      });
    }

    var sum = await data.reduce(async function (a, b) {
      return await { avg: a.rating + b.rating };
    });
    const len = await data.length;
    let avg = sum.avg / len;
    return res.status(200).json({
      success: true,
      rating: `This anime Rating is :  ${avg}`,
      message: `All rating On this Anime id: ${id}`,
      data: data,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "anime review not get data",
      err,
    });
  }
};

exports.updateRatingByRatingId = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await Rating.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidator: true,
      useFindAndModify: false,
    });
    if (data) {
      return res.status(200).json({
        success: true,
        message: `Anime rating successfully updated`,
        data: data,
      });
    }
    return res.status(200).json({
      success: false,
      message: "anime rating not updated",
      err,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "anime rating not updated",
      err,
    });
  }
};

exports.DelteRatingByRatingId = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Rating.findOneAndDelete({ _id: id });
    if (data) {
      return res.status(200).json({
        success: true,
        message: `Anime rating deleted`,
        data: data,
      });
    }
    return res.status(200).json({
      success: false,
      message: "anime rating not deleted",
      err,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "anime rating not deleted",
      err,
    });
  }
};

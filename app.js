const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
var cors = require("cors");

const userRoutes = require("./router/userRouter");
const reviewRoutes = require("./router/reviewRoter");
const ratingRoutes = require("./router/ratingRouter");

dotenv.config();
require("./db/con");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  console.log(req.user);
  res.send(" Mongage user Api");
});

app.use("/api", userRoutes);
app.use("/review", reviewRoutes);
app.use("/rating", ratingRoutes);

app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`sarver started at port ${process.env.PORT} `);
});

const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userModel = require("../model/userModel");
dotenv.config();

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ err: "plz filled properly" });
  }

  ///////////////////////////////// async await or  /////////
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      console.log(userExist);
      return res.status(422).json({ error: "Email alreday Exist" });
    }

    const user = new User({
      name,
      email,
      password,
    });
    const userRegister = await user.save();
    if (userRegister) {
      res.status(201).json({ message: "user resgister successfuly" });
    } else {
      res.status(500).json({ error: "Faild to register" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  let token;

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ err: "plz fill data properly" });
  }

  User.findOne({ email: email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (user) {
      if (user.authenticate(password)) {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY_USER, {
          expiresIn: "24h",
        });
        const { _id, email, name } = user;
        res.status(200).json({ token, _id, email, name });
      } else {
        return res.status(400).json({
          message: "incoreet usr or email",
        });
      }
    } else {
      return res.status(400).json({ message: "email or password wrong" });
    }
  });
};

exports.updateProfile = async (req, res) => {
  const { name, password, userId } = req.body;
  const story = await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        name,
        password,
      },
    },
    { new: true }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: result });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({ error: e });
    });
};

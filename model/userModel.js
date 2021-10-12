const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    hash_password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
  authenticate: function (password) {
    //login time call hoga ye method whan se password pass hoga
    return bcrypt.compareSync(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", userSchema);

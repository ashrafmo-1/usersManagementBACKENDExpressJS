// go to mongoose introduction "quick start" <==
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 22,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 80,
  },
});

module.exports = mongoose.model("User", userSchema);
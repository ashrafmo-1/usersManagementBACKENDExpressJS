// go to mongoose introduction "quick start" <==
const mongoose = require("mongoose");
const userRole = require("../utils/user.role");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
    validate: {
      validator: function (v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRole.user, userRole.admin, userRole.manager],
    default: userRole.user
  }
});

module.exports = mongoose.model("User", userSchema);
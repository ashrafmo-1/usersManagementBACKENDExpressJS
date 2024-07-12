const { validationResult } = require("express-validator"); //? medile ware
const User = require("../models/users.modele"); //? get users data from DB server
const httpStatus = require("../utils/http.status");
const asyncWrapper = require("../middlewares/asyncWrapper");
const ERROR = require("../utils/ERROR");
const bcrypt = require('bcryptjs');

const register = asyncWrapper(async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

  const existsUser = await User.findOne({ email: email });
  if (existsUser) {
    const error = ERROR.create("User already exists", 422, "email already exists");
    return next(error);
  }

  //! password hashing
  const hashingPassword = await bcrypt.hash(password, 12);
  const Registration = new User({
    first_name,
    last_name,
    email,
    password: hashingPassword, //! not returning in response
  });
  await Registration.save();
  const { password: _, ...userWithoutPassword } = Registration.toObject();
  res.status(201).json({ code: 201, message: "User registered successfully", data: userWithoutPassword  });
});

//? login
const login = asyncWrapper(async (req, res, next) => {

  const { email, password } = req.body;
  if(!email && !password) {
    const error = ERROR.create("Please provide email and password", 422, "email and password are required");
    return next(error);
  }

  const user = await User.findOne({ email: email });
  if(!user) {
    const error = ERROR.create("User not found", 404, "not found any user");
    return next(error);
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if(email && matchPassword) {
  res.json({ code: 200, message: httpStatus.OK, information: user });
  }

});

const getAllUsers = async (req, res) => {
  //? get all data
  const query = req.query;
  const limit = query.limit || 8;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false, password: false }).limit(limit).skip(skip);
  res.json({ code: 200, message: httpStatus.OK, users: users });
};

//? get single user
const getSingleUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.userId).exec();
  if (!user) {
    const error = ERROR.create("User not found", 404, "not found any user");
    return next(error);
  }

  res.json({ code: 200, data: { user } });
});

const addNewUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ code: httpStatus.OK, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ code: httpStatus.ERR, message: "Server Error" });
  }
};

const chnageUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const changeUserInfo = await User.findByIdAndUpdate(
      userId,
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(200).json(changeUserInfo);
  } catch (err) {
    return res.status(500).json({ message: httpStatus.ERR });
  }
};

const delUser = async (req, res) => {
  //? done;
  const data = await User.deleteOne({ _id: req.params.userId });
  res.status(200).json({ message: httpStatus.OK, data: null });
};

module.exports = { login, register, getAllUsers, getSingleUser, addNewUser, chnageUser, delUser };
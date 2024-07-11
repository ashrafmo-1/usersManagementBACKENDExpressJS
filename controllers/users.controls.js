const { validationResult } = require("express-validator"); //? medile ware
const User = require("../models/users.modele"); //? get users data from DB server
const httpStatus = require("../utils/http.status");
const { response } = require("express");

const getAllUsers = async (req, res) => { //? get all data
  //? handle pagenate users
  const query = req.query;
  const limit = query.limit || 8;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, {"__v": false}).limit(limit).skip(skip);
  res.json({code: 200, message: httpStatus.OK, data: users});
};

const getSingleUser = async (req, res) => { //? get single user
  try {
    const user = await User.findById(req.params.userId).exec();
    !user ? res.status(404).json({ message: httpStatus.Fail, user: null }) : null;
    res.json({code: 200, date: {user}});
  } catch (err) {
    return res.status(400).json({ code: 400, message: httpStatus.ERR, user: null }); // ! error
  }
};

//? done
//! const addNewUser = async (req, res) => {
//!   console.log(req.body);
//!   const errors = validationResult(req);
//!   if (!errors.isEmpty()) {
//!     return res.status(400).json({ errors: errors.array() });
//!   }
//!   try {
//!     const user = new User(req.body);
//!     await user.save();
//!     res.status(201).json({ code: httpStatus.OK, user });
//!   } catch (err) {
//!     res.status(500).json({ code: httpStatus.ERR, message: "Server Error" });
//!   }
//! };

//? const addNewUser = async (req, res) => {
//?   console.log(req.body);
//?   const errors = validationResult(req);
//?   if (!errors.isEmpty()) {
//?     return res.status(400).json({ errors: errors.array() });
//?   }
//?   try {
//?     const user = new User(req.body);
//?     await user.save();
//?     res.status(201).json({ code: httpStatus.OK, user });
//?   } catch (err) {
//?     console.error(err.message);
//?     res.status(500).json({ code: httpStatus.ERR, message: "Server Error" });
//?   }
//? };

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

const delUser = async (req, res) => { //? done;
  const data = await User.deleteOne({ _id: req.params.userId });
  res.status(200).json({ message: httpStatus.OK, data: null });
};

module.exports = { getAllUsers, getSingleUser, addNewUser, chnageUser, delUser };
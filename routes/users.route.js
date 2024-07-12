const express = require("express");
const router = express.Router();
// data controller functions
let userController = require("../controllers/users.controls");
// const { validate } = require("../middlewares/valedationScheme"); //! will remove this package 

router.post("/login", userController.login);
router.post("/register", userController.register);

router.get("/", userController.getAllUsers);
router.get(`/:userId`, userController.getSingleUser);
router.post("/", userController.addNewUser);
router.patch("/:userId", userController.chnageUser);
router.delete("/:userId", userController.delUser);

module.exports = router;
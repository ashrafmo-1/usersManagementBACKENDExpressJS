const express = require("express");
const router = express.Router();
let userController = require("../controllers/users.controls");
const verifyToken = require("../middlewares/ProtectedFunction");
const allowedTO = require("../middlewares/allowedTO");
const userRole = require("../utils/user.role");

router.post("/login", userController.login);
router.post("/register", userController.register);

// router.get("/", verifyToken, userController.getAllUsers);
router.route('/').get(verifyToken, allowedTO(userRole.admin, userRole.manager), userController.getAllUsers);
// router.get(`/:userId`, userController.getSingleUser);
// router.post("/", userController.addNewUser);
// router.patch("/:userId", userController.chnageUser);
// router.delete("/:userId", userController.delUser);

module.exports = router;
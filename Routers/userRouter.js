const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("./../Controllers/userController");
const authController = require("./../Controllers/authController");

router.route("/Signup").post(userController.signup);
router.route("/Login").post(userController.login);
router.route("/Logout").get(userController.logout);
router
  .route("/delete/:id")
  .post(authController.protect, userController.deleteUser);
router.route("/Users").get(authController.protect, userController.getAllUsers);
router.route("/feedback").post(authController.protect, userController.feedback);
// router.use((req, res, next) => {
//   console.log(req.cookies);
//   next();
// });

module.exports = router;

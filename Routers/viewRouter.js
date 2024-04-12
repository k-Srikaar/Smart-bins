const express = require("express");
const router = express.Router({ mergeParams: true });
const viewController = require("./../Controllers/viewController");
const authController = require("./../Controllers/authController");
const gsmController = require("./../Controllers/gsmController");

router
  .route("/")
  .get(
    gsmController.getAllBinsContent,
    authController.isLoggedIn,
    viewController.overview
  );
router
  .route("/login")
  .get(gsmController.getAllBinsContent, viewController.login);
router
  .route("/signup")
  .get(gsmController.getAllBinsContent, viewController.signup);
router
  .route("/index")
  .get(
    gsmController.getAllBinsContent,
    authController.isLoggedIn,
    viewController.index
  );
router
  .route("/binddetails/:name")
  .get(
    gsmController.getAllBinsContent,
    authController.isLoggedIn,
    gsmController.getBIN,
    viewController.binstatus
  );
router
  .route("/alert")
  .get(gsmController.getAllBinsContent, viewController.alert);
router
  .route("/feedback")
  .get(
    gsmController.getAllBinsContent,
    authController.isLoggedIn,
    viewController.feedback
  );
// router.route("/binddetails");
// router.route("/index").get(viewController.getindexpage);

module.exports = router;

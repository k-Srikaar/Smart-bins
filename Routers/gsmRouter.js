const express = require("express");
const router = express.Router({ mergeParams: true });
const gsmController = require("./../Controllers/gsmController");

// router.use((req, res, next) => {
//   console.log("asfdfsdfdsafdsfdsfsd");
//   next();
// });
router.route("/create").post(gsmController.createBin);
router.route("/getBin/:name").get(gsmController.getBin);
router.route("/getAllBins").get(gsmController.getAllBins);
router.route("/getlocation").get(gsmController.getlocation);
module.exports = router;

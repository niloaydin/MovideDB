const express = require("express");
const managerController = require("../controllers/managerController");

const router = express.Router();

router.post("/addAudience", managerController.addAudience); // done
router.post("/addDirector", managerController.addDirector); // done
router.delete("/deleteAudience/:username", managerController.deleteAudience); //done ?
router.put(
  "/updatePlatform/:username",
  managerController.updatePlatformOfDirector
); // done
router.get("/showDirectors", managerController.showDirectors); // done
router.get("/showRatings", managerController.showRatingsOfAudience);
router.get("/showMovies", managerController.showDirectorMovies);
router.get("/showAvgRating", managerController.showAverageRating);

module.exports = router;

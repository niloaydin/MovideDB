const express = require("express");
const managerController = require("../controllers/managerController");

const router = express.Router();

router.post("/addUser", managerController.addUser);
router.delete("/deleteAudience", managerController.deleteAudience);
router.put("/updatePlatform", managerController.updatePlatformOfDirector);
router.get("/showDirectors", managerController.showDirectors);
router.get("/showRatings", managerController.showRatingsOfAudience);
router.get("/showMovies", managerController.showDirectorMovies);
router.get("/showAvgRating", managerController.showAverageRating);

module.exports = router;

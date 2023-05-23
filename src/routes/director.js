const express = require("express");
const directorController = require("../controllers/directorController");

const router = express.Router();

router.post("/addMovie", directorController.addMovie);
router.post("/addPredecessor", directorController.addPredecessor);

module.exports = router;

const express = require("express");
const audienceController = require("../controllers/audienceController");

const router = express.Router();

router.get("/listMovies", audienceController.listMovies);
router.get("/viewTickets", audienceController.viewTickets);
router.post("/buyTicket", audienceController.buyTicket);

module.exports = router;

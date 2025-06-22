const express = require("express");
const router = express.Router();
const { getTrips, createTrip } = require("../controllers/tripController");
router.post("/test", (req, res) => {
  res.json({ message: "Test route working!" });
});

router.get("/", getTrips);       // GET /api/trips → Get all trips
router.post("/", createTrip);    // POST /api/trips → Create a trip

module.exports = router;

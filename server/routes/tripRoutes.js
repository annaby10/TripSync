const express = require("express");
const router = express.Router();
const { getTrips, createTrip, deleteTrip, updateTrip } = require("../controllers/tripController");
router.post("/test", (req, res) => {
  res.json({ message: "Test route working!" });
});

router.get("/", getTrips);       // GET /api/trips → Get all trips
router.post("/", createTrip);    // POST /api/trips → Create a trip
router.delete("/:id", deleteTrip);
router.put("/:id", updateTrip); 

module.exports = router;

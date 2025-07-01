const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const Trip = require('../models/trip');

// Example: Get all trips for logged-in user
router.get('/', protect, async (req, res) => {
  const trips = await Trip.find({ user: req.user._id });
  res.json(trips);
});

// Add `user` field in new trip
router.post('/', protect, async (req, res) => {
  const { title, destination, startDate, endDate } = req.body;
  const trip = new Trip({
    title,
    destination,
    startDate,
    endDate,
    user: req.user._id
  });
  await trip.save();
  res.status(201).json(trip);
});

module.exports = router;


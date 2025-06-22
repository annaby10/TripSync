const Trip = require("../models/trip");

// @desc    Get all trips
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create a new trip
const createTrip = async (req, res) => {
  const { title, destination, startDate, endDate, participants, notes } = req.body;

  if (!title || !destination || !startDate || !endDate) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const newTrip = new Trip({ title, destination, startDate, endDate, participants, notes });
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(500).json({ message: "Could not create trip" });
  }
};

module.exports = {
  getTrips,
  createTrip,
};

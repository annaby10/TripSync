const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  participants: {
    type: [String], // list of usernames or user IDs (simple for now)
    default: [],
  },
  notes: {
    type: String,
    default: "",
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

module.exports = mongoose.model("Trip", tripSchema);

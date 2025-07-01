// trip.js

const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  destination: String,
  startDate: Date,
  endDate: Date,
  checklist: [checklistItemSchema],
  // models/trip.js
// Add this field to your existing schema
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
 // ✅ This now works
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;

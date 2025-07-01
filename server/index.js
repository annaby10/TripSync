const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const tripRoutes = require("./routes/tripRoutes"); // ✅ KEEP ONLY THIS

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("TripSync API is running 🚀");
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use("/api/trips", tripRoutes); // ✅ Mounts all your trip routes, including checklist

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

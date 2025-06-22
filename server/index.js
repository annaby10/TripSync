const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // allows reading JSON body

// Connect to DB
connectDB();

// Sample route
app.get("/", (req, res) => {
  res.send("TripSync API is running 🚀");
});

const tripRoutes = require("./routes/tripRoutes");

app.use("/api/trips", tripRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors());

// Import the user router
const userRoute = require("./userRoute");

// Middleware to parse JSON request bodies
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(err);
      console.log("Server running on port", process.env.PORT || 8000);
    });
  })
  .catch((error) => {
    console.log(error, "There was an error connecting to MongoDB");
  });



// Use the user router for `/users` routes
app.use("/", userRoute);
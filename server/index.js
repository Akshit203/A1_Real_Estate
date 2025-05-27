const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const authController = require('./controllers/authController');
const propertyController = require('./controllers/propertyController');
const uploadController = require("./controllers/uploadController");


const cors = require('cors');

// Initialize express app
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Log incoming requests
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

// Mongoose connection with Promise handling
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000, // Increase timeout
  socketTimeoutMS: 45000, // Increase socket timeout
})
  .then(() => console.log("MongoDB has been started successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Routes
app.use("/auth", authController); // Register routes for authentication
app.use('/api/property', propertyController);
app.use("/api/user", uploadController);
app.use('/api/contact', propertyController);




const path = require('path');
app.use("/images", express.static(path.join(__dirname, "public/images")));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server after setting up routes and middlewares
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server has been started successfully on port ${process.env.PORT || 5000}`);
});

require('dotenv').config(); // load .env file
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URL;

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Error connecting:", err));

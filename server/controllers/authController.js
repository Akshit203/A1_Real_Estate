const authController = require('express').Router();
const User = require('../models/User');
const jwt = require("jsonwebtoken");

// REGISTER USER
authController.post('/register', async (req, res) => {
  try {
    const email = req.body.email.toLowerCase(); // Normalize email
    const isExisting = await User.findOne({ email });

    if (isExisting) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const newUser = await User.create({ ...req.body, email });

    const { password, ...others } = newUser._doc;

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '8d',
    });

    return res.status(201).json({
      message: "Registration successful",
      user: others,
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    return res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

// LOGIN USER
authController.post("/login", async (req, res) => {
  console.log("Login API called");
  try {
    const email = req.body.email.toLowerCase();
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const { password, ...others } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '8d',
    });

    return res.status(200).json({
      message: "Login successful",
      user: others,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ message: "Internal Server Error. Try again." });
  }
});

module.exports = authController;

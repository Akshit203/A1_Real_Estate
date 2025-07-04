const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const verifyToken = require('../middlewares/verifyToken');
const Property = require('../models/Property');
const User = require('../models/User');
const mongoose = require('mongoose');

require("dotenv").config();

const nodemailer = require("nodemailer");


const propertyController = express.Router();

// Inside propertyController (below other routes)
propertyController.post('/send-mail', async (req, res) => {
  const { sellerEmail, name, email, message } = req.body;

  if (!sellerEmail || !name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,  // aapka Gmail account
      pass: process.env.MAIL_PASS,  // Gmail app password
    },
  });

  const mailOptions = {
    from: `RealEstate App <${process.env.MAIL_USER}>`,
    to: sellerEmail,  // Fixed email jo frontend se aa rahi hai
    subject: `New Inquiry from RealEstate App`,
    text: `You have a new message:

Name: ${name}
Email: ${email}
Message: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});






// Ensure uploads folder exists - create if missing
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);  // Absolute path for uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// Serve uploads folder as static for images access
// This needs to be added in your main server file (e.g., app.js or index.js):
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Without this, frontend can't access images via /uploads/filename.jpg

// Routes

// GET all properties
propertyController.get('/getAll', async (req, res) => {
  try {
    const properties = await Property.find({}).populate("currentOwner", '-password');
    return res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

// GET featured properties
propertyController.get('/find/featured', async (req, res) => {
  try {
    const featuredProperties = await Property.find({ featured: true }).populate("currentOwner", '-password');
    return res.status(200).json(featuredProperties);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// GET properties filtered by type (via query)
propertyController.get('/find', async (req, res) => {
  const filter = req.query || {};
  try {
    const properties = Object.keys(filter).length > 0
      ? await Property.find(filter).populate("currentOwner", '-password')
      : await Property.find({});
    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// GET counts for property types
propertyController.get('/find/types', async (req, res) => {
  try {
    const beachType = await Property.countDocuments({ type: 'beach' });
    const mountainType = await Property.countDocuments({ type: 'mountain' });
    const villageType = await Property.countDocuments({ type: 'village' });

    return res.status(200).json({ beach: beachType, mountain: mountainType, village: villageType });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
propertyController.get('/find/my-properties', verifyToken, async (req, res) => {
  console.log('Logged in user ID:', req.user.id);
  try {
    const properties = await Property.find({ currentOwner: req.user.id })
      .populate('currentOwner', 'email name'); // populate owner's email and name only
    console.log('Properties found:', properties.length);
    return res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});


// // GET properties owned by logged-in user
// propertyController.get('/find/my-properties', verifyToken, async (req, res) => {
//   console.log('Logged in user ID:', req.user.id);
//   try {
//     const properties = await Property.find({ currentOwner: req.user.id });
//     console.log('Properties found:', properties.length);
//     return res.status(200).json(properties);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: error.message });
//   }
// });



// GET bookmarked properties for logged-in user
propertyController.get('/find/bookmarked-properties', verifyToken, async (req, res) => {
  try {
    const properties = await Property.find({ bookmarkedUsers: { $in: [req.user.id] } });
    return res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

// GET single property by ID
propertyController.get('/find/:id', async (req, res) => {
  const id = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid property ID format' });
  }

  try {
    const property = await Property.findById(id).populate('currentOwner', '-password');
    if (!property) {
      return res.status(404).json({ message: 'No property found with that ID' });
    }
    return res.status(200).json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});



// POST create new property (with images)
propertyController.post('/', verifyToken, upload.array('image'), async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    // amenities might be sent as array or single string
    const amenitiesRaw = req.body['amenities[]'] || req.body.amenities || [];
    const amenities = Array.isArray(amenitiesRaw) ? amenitiesRaw : [amenitiesRaw];

    const propertyData = {
      title: req.body.title,
      location: req.body.location,
      price: Number(req.body.price),
      beds: Number(req.body.beds),
      baths: Number(req.body.baths),
      sqft: Number(req.body.sqft),
      type: req.body.type,
      availability: req.body.availability,
      description: req.body.description,
      phone: req.body.phone,
      featured: req.body.featured === 'true' || req.body.featured === true,
      currentOwner: req.user.id,
      amenities: amenities.map(a => a.trim()),
      images: req.files.map(file => path.join('/uploads', path.basename(file.path))), // relative URL for client
    };

    const newProperty = await Property.create(propertyData);
    return res.status(201).json(newProperty);
  } catch (error) {
    console.error('Error creating property:', error);
    return res.status(500).json({ message: error.message });
  }
});

// PUT update property by ID
propertyController.put('/:id', verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    if (property.currentOwner.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not allowed to update other people's properties" });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updatedProperty);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

propertyController.put('/bookmark/:id', verifyToken, async (req, res) => {
  try {
    console.log("User ID from token:", req.user.id);
    console.log("Property ID param:", req.params.id);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log("Invalid property ID");
      return res.status(400).json({ message: "Invalid property ID" });
    }

    const property = await Property.findById(req.params.id);
    console.log("Fetched property:", property);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (!req.user || !req.user.id) {
      return res.status(403).json({ message: "Invalid user" });
    }

    const userIdStr = req.user.id.toString();

    if (!property.currentOwner) {
      console.log("Property has no currentOwner");
      return res.status(500).json({ message: "Property owner not set" });
    }

    if (property.currentOwner.toString() === userIdStr) {
      return res.status(403).json({ message: "You are not allowed to bookmark your own property" });
    }

    const isBookmarked = property.bookmarkedUsers.some(id => id.toString() === userIdStr);

    if (isBookmarked) {
      property.bookmarkedUsers = property.bookmarkedUsers.filter(id => id.toString() !== userIdStr);
    } else {
      property.bookmarkedUsers.push(mongoose.Types.ObjectId(userIdStr));
    }

    await property.save();

    return res.status(200).json({ message: `Property ${isBookmarked ? 'unbookmarked' : 'bookmarked'} successfully`, property });
  } catch (error) {
    console.error("Error in bookmark toggle:", error);
    return res.status(500).json({ message: error.message });
  }
});



// DELETE property by ID
propertyController.delete('/:id', verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    if (property.currentOwner.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not allowed to delete other people's properties" });
    }

    await property.deleteOne();

    return res.status(200).json({ msg: "Successfully deleted property" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = propertyController;

const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: { 
    type: [String],
    required: true
  },
  beds: {
    type: Number,
    required: true,
  },
  baths: {
    type: Number,
    required: true,
  },
  sqft: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amenities: {
    type: Array,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  featured: { 
    type: Boolean, 
    default: false 
  },
  bookmarkedUsers: [
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" 
    }
  ],
  currentOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profileImage: {
    type: String, // This will store the image URL (from Cloudinary or local uploads)
    default: ''   // Can be a default avatar URL if you want
  },
  savedProperties: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Property' }
  ]
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Check if the password is modified or is new
  if (!this.isModified('password')) return next();

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password match method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

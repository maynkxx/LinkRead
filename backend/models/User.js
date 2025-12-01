const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    select: false
  },
  googleId: {
    type: String,
    default: null
  },
  profilePic: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
    default: "",
    maxlength: 500
  },
  streak: {
    currentStreak: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: null }
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

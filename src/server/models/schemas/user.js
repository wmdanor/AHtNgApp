const mongoose = require('mongoose');

const User = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },

  games: {
    type: [Number],
    default: [],
  },

  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = User;

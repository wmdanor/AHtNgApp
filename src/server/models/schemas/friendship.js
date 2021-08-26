const mongoose = require('mongoose');

const Friendship = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  userSent: {
    type: Number,
    required: true,
  },
  userReceived: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ['FRIENDS', 'PENDING'],
    required: true,
  },

  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Friendship;

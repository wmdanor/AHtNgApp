const mongoose = require('mongoose');

const Friendship = new mongoose.Schema({
  _id: {
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
    enum: ['FRIENDS', 'SENT_REQUEST', 'RECEIVED_REQUEST'],
    required: true,
  },

  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Friendship;

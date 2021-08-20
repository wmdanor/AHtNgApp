const mongoose = require('mongoose');

const Game = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tags: {
    type: [Number],
    default: [],
  },

  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Game;

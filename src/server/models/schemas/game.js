const mongoose = require('mongoose');

const Game = new mongoose.Schema({
  id: {
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
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  tags: {
    type: [String],
    default: [],
  },

  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Game;

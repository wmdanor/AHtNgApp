const mongoose = require('mongoose');

const Tag = new mongoose.Schema({
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

  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Tag;

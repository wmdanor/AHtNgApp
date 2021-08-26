const Tag = require('../models/tag');

const getAllTags = async () => Tag.find();

module.exports = {
  getAllTags,
};

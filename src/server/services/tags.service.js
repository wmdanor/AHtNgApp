const Tag = require('../models/tag');

const getAllTags = async () => await Tag.find();

module.exports = {
  getAllTags,
};

const {
  getAllTags,
} = require('../services/tags.service');

const getTags = async (req, res) => {
  res.json({tags: getAllTags()});
}

module.exports = {
  getTags,
};

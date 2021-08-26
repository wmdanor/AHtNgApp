const {
  getAllTags,
} = require('../services/tags.service');

const getTags = async (req, res) => {
  res.json({tags: await getAllTags()});
}

module.exports = {
  getTags,
};

const {
  getAllTags,
} = require('../services/users.service');

const getTags = async (req, res) => {
  res.json({tags: getAllTags()});
}

module.exports = {
  getTags,
};

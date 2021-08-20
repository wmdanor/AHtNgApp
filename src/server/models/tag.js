const mongoose = require('mongoose');
const schema = require('./schemas/tag');

const Tag = mongoose.model('Tag', schema);

module.exports = Tag;

const mongoose = require('mongoose');
const schema = require('./schemas/tag');
const autoIncrement = require("../mongo-autoincr");

schema.plugin(autoIncrement.plugin, {model: 'Tag', startAt: 1, field: 'id'});
const Tag = mongoose.model('Tag', schema);

module.exports = Tag;

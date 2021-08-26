const mongoose = require('mongoose');
const schema = require('./schemas/friendship');
const autoIncrement = require("../mongo-autoincr");

schema.plugin(autoIncrement.plugin, {model: 'Friendship', startAt: 1, field: 'id'});
const Friendship = mongoose.model('Friendship', schema);

module.exports = Friendship;

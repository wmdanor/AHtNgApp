const mongoose = require('mongoose');
const schema = require('./schemas/friendship');

const Friendship = mongoose.model('Friendship', schema);

module.exports = Friendship;

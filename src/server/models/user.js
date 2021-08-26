const mongoose = require('mongoose');
const schema = require('./schemas/user');
const autoIncrement = require("../mongo-autoincr");

schema.plugin(autoIncrement.plugin, {model: 'User', startAt: 1, field: 'id'});
const User = mongoose.model('User', schema);

module.exports = User;

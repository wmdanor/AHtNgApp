const mongoose = require('mongoose');
const schema = require('./schemas/game');
const autoIncrement = require("../mongo-autoincr");

schema.plugin(autoIncrement.plugin, {model: 'Game', startAt: 1, field: 'id'});
const Game = mongoose.model('Game', schema);

module.exports = Game;

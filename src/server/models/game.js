const mongoose = require('mongoose');
const schema = require('./schemas/game');

const Game = mongoose.model('Game', schema);

module.exports = Game;

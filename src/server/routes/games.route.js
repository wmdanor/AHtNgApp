const express = require('express');
const {asyncWrapper} = require('../utils/routerUtils');
const {
} = require('../controllers/games.controller');

const gamesRouter = new express.Router();

gamesRouter.get('/', asyncWrapper());

module.exports = {
  gamesRouter,
};

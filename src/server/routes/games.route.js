const express = require('express');
const {asyncWrapper} = require('../utils/routerUtils');
const {
} = require('../controllers/games.controller');

const gamesRouter = new express.Router();

gamesRouter.get('/', asyncWrapper());
gamesRouter.get('/:id', asyncWrapper());

module.exports = {
  gamesRouter,
};

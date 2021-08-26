const express = require('express');
const {asyncWrapper} = require('../utils/routerUtils');
const {getGames, getGame} = require("../controllers/games.controller");
const {getTags} = require("../controllers/tags.controller");
const {offsetLimitQueryValidator, queryGamesFilterValidator, paramIdValidator} = require("../middlewares/validation");

const gamesRouter = new express.Router();

gamesRouter.get(
  '/',
  offsetLimitQueryValidator, queryGamesFilterValidator,
  asyncWrapper(getGames),
  );

gamesRouter.get('/tags', asyncWrapper(getTags));

gamesRouter.get('/:id', paramIdValidator, asyncWrapper(getGame));

module.exports = {
  gamesRouter,
};

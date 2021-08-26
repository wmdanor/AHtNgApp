const express = require('express');
const {authRouter} = require("./auth.route");
const {gamesRouter} = require("./games.route");
const {usersRouter} = require("./user.route");
const {NotFoundError} = require("../models/errors");

const apiRouter = new express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/games', gamesRouter);
apiRouter.use('/users', usersRouter);

apiRouter.use('*', () => { throw new NotFoundError('Action not found'); });

module.exports = {
  apiRouter,
};

const express = require('express');
const {authRouter} = require("./auth.route");
const {gamesRouter} = require("./games.route");
const {tagsRouter} = require("./tag.route");
const {usersRouter} = require("./user.route");
const {NotFoundError} = require("../models/errors");

const apiRouter = new express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/games', gamesRouter);
apiRouter.use('/tags', tagsRouter);
apiRouter.use('/users', usersRouter);

apiRouter.use('*', (req, res) => { throw new NotFoundError('Action not found'); });

module.exports = {
  apiRouter,
};

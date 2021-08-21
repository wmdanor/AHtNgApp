const express = require('express');
const {asyncWrapper} = require('../utils/routerUtils');
const {
  getTags,
} = require('../controllers/tags.controller');

const tagsRouter = new express.Router();

tagsRouter.get('/', asyncWrapper(getTags));

module.exports = {
  tagsRouter,
};

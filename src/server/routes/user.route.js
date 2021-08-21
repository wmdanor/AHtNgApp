const express = require('express');
const {asyncWrapper} = require('../utils/routerUtils');
const {
  getCurrentUser,
  deleteCurrentUser,
  changeCurrentUserPassword,
  getUser,
} = require('../controllers/user.controller');
const {changePasswordValidator} = require('../middlewares/validation');

const usersRouter = new express.Router();

usersRouter.get('/me', asyncWrapper(getCurrentUser));
usersRouter.delete('/me', asyncWrapper(deleteCurrentUser));
usersRouter.patch(
  '/me',
  changePasswordValidator,
  asyncWrapper(changeCurrentUserPassword),
);

usersRouter.get('/:id', asyncWrapper(getUser));

module.exports = {
  usersRouter,
};
const express = require('express');
const {asyncWrapper} = require('../utils/routerUtils');
const {
  getCurrentUser,
  deleteCurrentUser,
  changeCurrentUserPassword,
  getUser,
  libraryGetGames,
  libraryAddGame,
  libraryCheckGame,
  friendsGetFriends,
  friendsGetSent,
  friendsGetReceived,
  friendsCheckStatus,
  friendsSetStatus,
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

usersRouter.get('/:id/games', asyncWrapper(libraryGetGames));
usersRouter.post('/:id/games/:gameId', asyncWrapper(libraryAddGame));
usersRouter.get('/:id/games/:gameId/check', asyncWrapper(libraryCheckGame));

usersRouter.get('/:id/friends', asyncWrapper(friendsGetFriends));
usersRouter.get('/:id/friends/sent', asyncWrapper(friendsGetSent));
usersRouter.get('/:id/friends/received', asyncWrapper(friendsGetReceived));
usersRouter.get('/:id/friends/:friendId/status', asyncWrapper(friendsCheckStatus));
usersRouter.put('/:id/friends/:friendId/status', asyncWrapper(friendsSetStatus));

module.exports = {
  usersRouter,
};

const express = require('express');
const {asyncWrapper} = require('../utils/routerUtils');
const {
  getUsers,
  getCurrentUser,
  editCurrentUser,
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
const {changePasswordValidator, offsetLimitQueryValidator, paramIdValidator, paramGameIdValidator,
  paramFriendIdValidator, queryQueryParamValidator, editProfileValidator
} = require('../middlewares/validation');
const {authMiddleware} = require("../middlewares/auth.middleware");

const usersRouter = new express.Router();

usersRouter.get(
  '/',
  offsetLimitQueryValidator, queryQueryParamValidator,
  asyncWrapper(getUsers),
);

usersRouter.get('/me', authMiddleware, asyncWrapper(getCurrentUser));
usersRouter.delete('/me', authMiddleware, asyncWrapper(deleteCurrentUser));
usersRouter.patch(
  '/me', authMiddleware,
  changePasswordValidator,
  asyncWrapper(changeCurrentUserPassword),
);

usersRouter.get('/:id', paramIdValidator, asyncWrapper(getUser));
usersRouter.put(
  '/:id', authMiddleware,
  paramIdValidator, editProfileValidator,
  asyncWrapper(editCurrentUser),
);

usersRouter.get('/:id/games', paramIdValidator, asyncWrapper(libraryGetGames));
usersRouter.post(
  '/:id/games/:gameId', authMiddleware,
  paramIdValidator, paramGameIdValidator,
  asyncWrapper(libraryAddGame),
);
usersRouter.get('/:id/games/:gameId/check',
  paramIdValidator, paramGameIdValidator,
  asyncWrapper(libraryCheckGame),
);

usersRouter.get('/:id/friends',
  offsetLimitQueryValidator, paramIdValidator,
  asyncWrapper(friendsGetFriends),
);
usersRouter.get(
  '/:id/friends/sent', authMiddleware,
  paramIdValidator,
  asyncWrapper(friendsGetSent),
);
usersRouter.get(
  '/:id/friends/received', authMiddleware,
  paramIdValidator,
  asyncWrapper(friendsGetReceived),
);
usersRouter.get(
  '/:id/friends/:friendId/status', authMiddleware,
  paramIdValidator, paramFriendIdValidator,
  asyncWrapper(friendsCheckStatus),
);
usersRouter.post(
  '/:id/friends/:friendId/status', authMiddleware,
  paramIdValidator, paramFriendIdValidator,
  asyncWrapper(friendsSetStatus),
);

module.exports = {
  usersRouter,
};

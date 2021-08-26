const {ArgumentError, BadRequestError} = require('../models/errors');
const {
  getUserById,
  deleteUserById,
  updateUserPassword,
  libraryGetLibraryGames,
  libraryPostGame,
  libraryIsInLibrary,
  friendsGetFriendsPage,
  friendsGetSentRequestsPage,
  friendsGetRecRequestsPage,
  friendsGetFriendshipStatus,
  friendsSetFriendshipStatus, getUsersPage,
} = require('../services/users.service');
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../config/default");

const getUsers = async (req, res) => {
  const {limit, offset, query} = req.query;

  const pagination = {limit, offset};

  const options = {query};
  const authToken = req.cookies.jwt;

  if (authToken) {
    const user = jwt.verify(authToken, jwtSecret);
    options.ignoreId = user.userId;
  }

  const page = await getUsersPage(pagination, options);

  res.json({
    ...pagination,
    ...page,
  });
};

const getCurrentUser = async (req, res) => {
  const {userId} = req.user;

  const user = await getUserById(userId);

  if (!user) {
    throw new BadRequestError('User with such id is not found.');
  }

  const {
    email,
    username,
    createdDate,
  } = user;

  res.json({
    user: {
      id: userId,
      email,
      username,
      createdDate,
    },
  });
};

const deleteCurrentUser = async (req, res) => {
  const {userId} = req.user;

  await deleteUserById(userId);

  res.json({message: 'Profile deleted successfully'});
};

const changeCurrentUserPassword = async (req, res) => {
  const {userId} = req.user;

  try {
    await updateUserPassword(userId, req.body);

    res.json({message: 'Password changed successfully'});
  } catch (err) {
    if (err instanceof ArgumentError) {
      throw new BadRequestError(err.message);
    } else {
      throw err;
    }
  }
};

const getUser = async (req, res) => {
  const {id} = req.params;

  const user = await getUserById(id);

  if (!user) {
    throw new BadRequestError('User with such id is not found.');
  }

  const {
    email,
    createdDate,
    username,
  } = user;

  res.json({
    user: {
      id,
      email,
      username,
      createdDate,
    },
  });
};

const libraryGetGames = async (req, res) => {
  const {id} = req.params;

  const games = await libraryGetLibraryGames(id);

  res.json({games});
};

const libraryAddGame = async (req, res) => {
  const {id} = req.params;
  const {userId} = req.user;
  if (id !== userId) {
    throw new BadRequestError('You have no permission for this action');
  }
  const gameId = req.params.id;

  const game = await libraryPostGame(id, gameId);

  res.json({gameId});
};

const libraryCheckGame = async (req, res) => {
  const {id} = req.params;

  const isInLibrary = await libraryIsInLibrary(id, req.params.id);

  res.json({isInLibrary});
};

const friendsGetFriends = async (req, res) => {
  const {id} = req.params;
  const {limit, offset} = req.query;

  const pagination = {limit, offset};

  const page = await friendsGetFriendsPage(id, pagination);

  res.json({
    ...pagination,
    ...page,
  });
};

const friendsGetSent = async (req, res) => {
  const {id} = req.params;
  const {userId} = req.user;
  if (id !== userId) {
    throw new BadRequestError('You have no permission for this action');
  }
  const {limit, offset} = req.query;

  const pagination = {limit: Number(limit), offset: Number(offset)};

  const page = await friendsGetSentRequestsPage(id, pagination);

  res.json({
    ...pagination,
    ...page,
  });
};

const friendsGetReceived = async (req, res) => {
  const {id} = req.params;
  const {userId} = req.user;
  if (id !== userId) {
    throw new BadRequestError('You have no permission for this action');
  }
  const {limit, offset} = req.query;

  const pagination = {limit: Number(limit), offset: Number(offset)};

  const page = await friendsGetRecRequestsPage(id, pagination);

  res.json({
    ...pagination,
    ...page,
  });
};

const friendsCheckStatus = async (req, res) => {
  const {id, friendId} = req.params;
  const {userId} = req.user;
  if (id !== userId) {
    throw new BadRequestError('You have no permission for this action');
  }

  const status = await friendsGetFriendshipStatus(id, friendId);

  res.json({status});
};

const friendsSetStatus = async (req, res) => {
  const {id, friendId} = req.params;
  const {userId} = req.user;
  if (id !== userId) {
    throw new BadRequestError('You have no permission for this action');
  }

  const status = await friendsSetFriendshipStatus(id, friendId, req.body.status);

  res.json({status});
};

module.exports = {
  getUsers,
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
};

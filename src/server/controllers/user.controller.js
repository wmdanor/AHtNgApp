const {ArgumentError, BadRequestError, UnauthorizedError} = require('../models/errors');
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
  friendsSetFriendshipStatus, getUsersPage, updateUser,
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
    age,
    createdDate,
  } = user;

  res.json({
    user: {
      id: userId,
      email,
      username,
      age,
      createdDate,
    },
  });
};

const editCurrentUser = async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;
  if (userId !== id) {
    throw new UnauthorizedError('You have no rights to perform this action');
  }
  const {email, username, age} = req.body;

  const user = await updateUser(userId, {email, username, age});

  if (!user) {
    throw new BadRequestError('User with such id is not found.');
  }

  res.json({user});
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
    username,
    age,
    createdDate,
  } = user;

  res.json({
    user: {
      id,
      email,
      username,
      age,
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
  const {id, gameId} = req.params;
  const {userId} = req.user;
  if (id !== userId) {
    throw new BadRequestError('You have no permission for this action');
  }

  await libraryPostGame(id, gameId);

  res.json({gameId});
};

const libraryCheckGame = async (req, res) => {
  const {id, gameId} = req.params;

  const isInLibrary = await libraryIsInLibrary(id, gameId);

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
};

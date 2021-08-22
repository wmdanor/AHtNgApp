const {ArgumentError, BadRequestError} = require('../models/errors');
const {
  getUserById,
  deleteUserById,
  updateUserPassword,
} = require('../services/users.service');

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
  // TODO
};

const libraryAddGame = async (req, res) => {
  // TODO
};

const libraryCheckGame = async (req, res) => {
  // TODO
};

const friendsGetFriends = async (req, res) => {
  // TODO
};

const friendsGetSent = async (req, res) => {
  // TODO
};

const friendsGetReceived = async (req, res) => {
  // TODO
};

const friendsCheckStatus = async (req, res) => {
  // TODO
};

const friendsSetStatus = async (req, res) => {
  // TODO
};

module.exports = {
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

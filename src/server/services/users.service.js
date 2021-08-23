const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/default');
const {ArgumentError} = require('../models/errors');

const User = require('../models/user');
const Game = require('../models/game');

const addUser = async ({email, username, password}) => {
  const user = new User({
    email,
    username,
    passwordHash: await bcrypt.hash(password, 10),
  });

  await user.save();
};

const getUserById = async (userId) => await User.findById(userId);

const deleteUserById = async (userId) =>
  await User.findByIdAndDelete(userId);

const updateUserPassword = async (userId, {oldPassword, newPassword}) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ArgumentError('User does not exist', 'userId');
  }

  if (!(await bcrypt.compare(oldPassword, user.passwordHash))) {
    throw new ArgumentError('Invalid password', 'oldPassword');
  }

  await User.findByIdAndUpdate(userId, {$set: {
      passwordHash: await bcrypt.hash(newPassword, 10),
    }});
};

const getUserToken = async ({email, password}) => {
  const user = await User.findOne({email});

  if (!user) {
    throw new ArgumentError('Invalid email or password', 'email');
  }

  if (!(await bcrypt.compare(password, user.passwordHash))) {
    throw new ArgumentError('Invalid email or password', 'password');
  }

  return jwt.sign({
    userId: user._id,
    email: user.email,
    username: user.username,
  }, jwtSecret);
};

const libraryGetLibraryGames = async (userId) => {
  const {games} = getUserById(userId);
  const result = [];

  for (const gameId of games) {
    result.push(Game.findById(gameId));
  }

  return result;
}

const libraryPostGame = async (userId, gameId) => {
  const user = await getUserById(userId);

  if (!user) {
    return null;
  }

  if (!user.games.find(v => v === gameId)) {
    user.games.push(gameId);
    await User.findByIdAndUpdate(userId, {$set: {
        games: user.games.push(),
      }});
  }
}

const libraryIsInLibrary = async (userId, gameId) => {
  const user = await getUserById(userId);

  if (!user) {
    return;
  }

  return Boolean(user.games.find(v => v === gameId));
}

const friendsGetFriendsPage = async (userId, {limit, offset}) => {
  //

  return {
    count: 0,
    friends: [],
  };
}

const friendsGetSentRequestsPage = async (userId, {limit, offset}) => {

}

const friendsGetRecRequestsPage = async (userId, {limit, offset}) => {

}

const friendsGetFriendshipStatus = async (userId, friendId) => {

}

const friendsSetFriendshipStatus = async (userId, friendId, status) => {

}

module.exports = {
  addUser,
  getUserById,
  deleteUserById,
  updateUserPassword,
  getUserToken,
  libraryGetLibraryGames,
  libraryPostGame,
  libraryIsInLibrary,
  friendsGetFriendsPage,
  friendsGetSentRequestsPage,
  friendsGetRecRequestsPage,
  friendsGetFriendshipStatus,
  friendsSetFriendshipStatus,
};

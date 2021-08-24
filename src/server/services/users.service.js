const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/default');
const {ArgumentError} = require('../models/errors');

const User = require('../models/user');
const Game = require('../models/game');
const Friendship = require('../models/friendship');

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
  return Friendship.aggregate([
    {
      $match: {
        $or: [{userSent: userId}, {userReceived: userId}],
        status: 'FRIENDS',
      }
    },
    {
      $facet: {
        "stage1": [{"$group": {_id: null, count: {$sum: 1}}}],
        "stage2": [{"$skip": offset}, {"$limit": limit}],
      }
    },
    {$unwind: "$stage1"},
    {
      $project: {
        count: "$stage1.count",
        friends: "$stage2"
      }
    }
  ]);
}

const friendsGetSentRequestsPage = async (userId, {limit, offset}) => {
  return Friendship.aggregate([
    {
      $match: {userSent: userId, status: 'PENDING'},
    },
    {
      $facet: {
        "stage1": [{"$group": {_id: null, count: {$sum: 1}}}],
        "stage2": [{"$skip": offset}, {"$limit": limit}],
      }
    },
    {$unwind: "$stage1"},
    {
      $project: {
        count: "$stage1.count",
        friends: "$stage2"
      }
    }
  ]);
}

const friendsGetRecRequestsPage = async (userId, {limit, offset}) => {
  return Friendship.aggregate([
    {
      $match: {userReceived: userId, status: 'PENDING'}
    },
    {
      $facet: {
        "stage1": [{"$group": {_id: null, count: {$sum: 1}}}],
        "stage2": [{"$skip": offset}, {"$limit": limit}],
      }
    },
    {$unwind: "$stage1"},
    {
      $project: {
        count: "$stage1.count",
        friends: "$stage2"
      }
    }
  ]);
}

const parseFriendshipStatus = (record, userId) => {
  if (!record) {
    return 'NONE';
  }

  if (record.status === 'FRIENDS') {
    return 'FRIENDS';
  }

  if (record.userSent === userId) {
    return 'SENT_REQUEST';
  }

  return 'RECEIVED_REQUEST';
}

const friendsGetFriendshipStatus = async (userId, friendId) => {
  const record = await Friendship.findOne({
    $or: [
      {userSent: userId, userReceived: friendId},
      {userSent: friendId, userReceived: userId},
    ]
  });

  return parseFriendshipStatus(record, userId);
}

const friendsSetFriendshipStatus = async (userId, friendId, status) => {
  let record;
  switch (status) {
    case 'FRIENDS':
      record = await Friendship.findOneAndUpdate(
        {userSent: friendId, userReceived: userId, status: 'PENDING'},
        {$set: {status}},
        );
      if (!record) {
        throw new ArgumentError('Friend request not found', 'status');
      }
      return 'FRIENDS';
    case 'SENT_REQUEST':
      record = Friendship.findOne({
        $or: [
          {userSent: userId, userReceived: friendId},
          {userSent: friendId, userReceived: userId},
        ]
      });
      if (record) {
        throw new ArgumentError(`Friendship status is already ${parseFriendshipStatus(record, userId)}`, 'status');
      }
      await Friendship.findByIdAndUpdate(record._id, {$set: {status}});
      const rec = new Friendship({userSent: userId, userReceived: friendId, status: 'PENDING'});
      await rec.save();
      return 'SENT_REQUEST'
    case 'RECEIVED_REQUEST':
      throw new ArgumentError("Status 'RECEIVED_REQUEST' can not be set", 'status');
    case 'NONE':
      record = Friendship.findOneAndDelete({
        $or: [
          {userSent: userId, userReceived: friendId},
          {userSent: friendId, userReceived: userId},
        ]
      });
      if (!record) {
        throw new ArgumentError('Friendship is not found', 'friendId');
      }
      return 'NONE';
    default:
      throw new ArgumentError(`Status '${status}' is not valid`, 'status');
  }
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

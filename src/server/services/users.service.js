const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/default');
const {ArgumentError} = require('../models/errors');

const User = require('../models/user');
const Game = require('../models/game');
const Friendship = require('../models/friendship');

const getUsersPage = async ({offset, limit}, {query, ignoreId}) => {
  const match = {};

  if (query) {
    match.username = {$regex: query, $options: 'i'};
  }

  if (ignoreId) {
    match.id = { $ne: ignoreId }
  }

  const result = await User.aggregate([
    {
      $match: {
        ...match,
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
        users: "$stage2"
      }
    }
  ]);

  if (!result[0]) {
    result[0] = {count: 0, users: []};
  }

  return result[0];
}

const addUser = async ({email, username, password}) => {
  const user = new User({
    email,
    username,
    passwordHash: await bcrypt.hash(password, 10),
  });

  await user.save();
};

const updateUser = async (id, {email, username, age}) =>
  User.findOneAndUpdate({id}, {
    $set: {email, username, age}
  });

const getUserById = async (userId) => await User.findOne({id: userId});

const deleteUserById = async (userId) =>
  await User.findOneAndDelete({id: userId});

const updateUserPassword = async (userId, {oldPassword, newPassword}) => {
  const user = await User.findOne({id: userId});

  if (!user) {
    throw new ArgumentError('User does not exist', 'userId');
  }

  if (!(await bcrypt.compare(oldPassword, user.passwordHash))) {
    throw new ArgumentError('Invalid password', 'oldPassword');
  }

  await User.findOneAndUpdate({id: userId}, {$set: {
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
    userId: user.id,
    email: user.email,
    username: user.username,
  }, jwtSecret);
};

const libraryGetLibraryGames = async (userId) => {
  const {games} = await getUserById(userId);
  const result = [];

  for (const gameId of games) {
    result.push(await Game.findOne({id: gameId}));
  }

  return result;
}

const libraryPostGame = async (userId, gameId) => {
  const user = await getUserById(userId);

  if (!user) {
    return null;
  }

  if (!user.games.includes(gameId)) {
    user.games.push(gameId);
    await User.findOneAndUpdate({id: userId}, {$set: {
        games: user.games,
      }});
  }
}

const libraryIsInLibrary = async (userId, gameId) => {
  const user = await getUserById(userId);

  if (!user) {
    return;
  }

  return user.games.includes(gameId);
}

const parseFriendsPage = async (page, userId) => {
  if (!page) {
    return {count: 0, users: []};
  }

  const result = {count: page.count, users: []};

  for (const {userSent, userReceived} of page.records) {
    result.users.push(await getUserById(userId === userSent ? userReceived : userSent));
  }

  return result;
}

const friendsGetFriendsPage = async (userId, {limit, offset}) => {
  const page = await Friendship.aggregate([
    { $match: {$or: [{userSent: userId}, {userReceived: userId}], status: 'FRIENDS'} },
    {
      $facet: {
        "stage1": [{"$group": {_id: null, count: {$sum: 1}}}],
        "stage2": [{"$skip": offset}, {"$limit": limit}],
      }
    },
    {$unwind: "$stage1"},
    { $project: {count: "$stage1.count", records: "$stage2"} }
  ]);

  return await parseFriendsPage(page[0], userId);
}

const friendsGetSentRequestsPage = async (userId, {limit, offset}) => {
  const page = await Friendship.aggregate([
    { $match: {userSent: userId, status: 'PENDING'} },
    {
      $facet: {
        "stage1": [{"$group": {_id: null, count: {$sum: 1}}}],
        "stage2": [{"$skip": offset}, {"$limit": limit}],
      }
    },
    {$unwind: "$stage1"},
    { $project: {count: "$stage1.count", records: "$stage2"} }
  ]);

  return await parseFriendsPage(page[0], userId);
}

const friendsGetRecRequestsPage = async (userId, {limit, offset}) => {
  const page = await Friendship.aggregate([
    { $match: {userReceived: userId, status: 'PENDING'} },
    {
      $facet: {
        "stage1": [{"$group": {_id: null, count: {$sum: 1}}}],
        "stage2": [{"$skip": offset}, {"$limit": limit}],
      }
    },
    {$unwind: "$stage1"},
    { $project: {count: "$stage1.count", records: "$stage2"} }
  ]);

  return await parseFriendsPage(page[0], userId);
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
  let record = undefined;
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
      record = await Friendship.findOne({
        $or: [
          {userSent: userId, userReceived: friendId},
          {userSent: friendId, userReceived: userId},
        ]
      });
      if (record) {
        throw new ArgumentError(`Friendship status is already ${parseFriendshipStatus(record, userId)}`, 'status');
      }
      const rec = new Friendship({userSent: userId, userReceived: friendId, status: 'PENDING'});
      await rec.save();
      return 'SENT_REQUEST'
    case 'RECEIVED_REQUEST':
      throw new ArgumentError("Status 'RECEIVED_REQUEST' can not be set", 'status');
    case 'NONE':
      record = await Friendship.findOneAndDelete({
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
  getUsersPage,
  addUser,
  updateUser,
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

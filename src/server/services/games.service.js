const Game = require('../models/game');

const getGamesPage = async ({limit, offset}, {name, maxPrice, tags}) => {
  const match = {};

  if (name) {
    match.name = {$regex: name, $options: 'i'};
  }

  if (maxPrice !== undefined && maxPrice !== null && maxPrice !== -1) {
    match.price = {$lte: maxPrice};
  }

  if (tags.length) {
    match.tags = { $in: tags };
  }

  console.log(match)

  const result = await Game.aggregate([
    { $match: {...match} },
    {
      $facet: {
        "stage1": [{"$group": {_id: null, count: {$sum: 1}}}],
        "stage2": [{"$skip": offset}, {"$limit": limit}],
      }
    },
    {$unwind: "$stage1"},
    { $project: {count: "$stage1.count", games: "$stage2"} }
  ]);

  if (!result[0]) {
    return {count: 0, games: []};
  }

  return result[0];
};


const getGameById = async (id) => Game.findOne({id});

module.exports = {
  getGamesPage,
  getGameById,
};

const {
  getGamesPage,
  getGameById,
} = require('../services/games.service');

const getGames = async (req, res) => {
  const {limit, offset, name, maxPrice, tags} = req.query;
  console.log(JSON.stringify(req.query));

  // TODO: implement query parsing
  res.json({games: getGamesPage({limit, offset}, {name, maxPrice, tags})});
};

const getGame = async (req, res) => {
  const {id} = req.params;

  res.json({game: getGameById(id)});
};

module.exports = {
  getGames,
  getGame,
};

const {
  getGamesPage,
  getGameById,
} = require('../services/games.service');

const getGames = async (req, res) => {
  const {limit, offset, name, maxPrice, tags} = req.query;

  const pagination = {limit, offset};

  const page = await getGamesPage(pagination, {name, maxPrice, tags});

  res.json({
    ...pagination,
    ...page,
  });
};

const getGame = async (req, res) => {
  const {id} = req.params;

  res.json({game: await getGameById(id)});
};

module.exports = {
  getGames,
  getGame,
};

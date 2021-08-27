const csv = require('csv-parser');
const fs = require('fs');
const {dbConnectionString} = require("../config/default");
const mongoose = require("mongoose");
const autoIncrement = require('../mongo-autoincr');
mongoose.connect(dbConnectionString, {
  useNewUrlParser: true, useUnifiedTopology: true,
  useFindAndModify: false, useCreateIndex: true,
})
  .then(() => {
    console.log('DB connection established');
  }).catch(() => {
  console.error('Failed to establish DB connection');
});
autoIncrement.initialize();

const Game = require('../models/game');
const Tag = require('../models/tag');
const path = require("path");

function readData() {
  const data = [];

  fs.createReadStream(path.join(__dirname, 'data.csv'))
    .pipe(csv())
    .on('data', (row) => data.push(row))
    .on('end', () => {
      pushData(data).then();
    });
}

async function pushData(data) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  let allTags = new Set();

  for (const row of data) {
    const {game, tags} = parseGame(row);

    // console.log(game, tags);
    // return;
    try {
      await game.save();
    } catch { }

    allTags = new Set([
      ...allTags,
      ...tags,
    ]);
  }

  for (const value of allTags) {
    const tag = new Tag({name: value});
    try {
      await tag.save();
    } catch { }
  }
}

function parseGame(row) {
  const {name, desc_snippet, popular_tags, genre, original_price, discount_price} = row;

  const tagsSet = new Set([
    ...parseTags(popular_tags),
    ...parseTags(genre)
  ])
  const tags = [...tagsSet];

  const price = parsePrice(original_price, discount_price);

  const game = new Game({
    name,
    description: desc_snippet,
    price,
    tags,
  })

  return {game, tags};
}

function parseTags(tags) {
  if (tags === 'NaN') return [];

  return tags.split(',');
}

function parsePrice(price1, price2) {
  let toParse = price1;

  if (toParse === '') {
    if (price2 === '') return 10;
    toParse = price2;
  }

  if (toParse.charAt(0) === '$') {
    return Math.round(
      Number(toParse.slice(1))
    );
  }

  return 0;
}

readData();

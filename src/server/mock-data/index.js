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

const create = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  let obj;

  console.log('stage 1: games');

  obj = new Game({
    name: 'Doom',
    price: 10,
    tags: ['slasher', 'fpp'],
  });

  await obj.save();

  console.log('stage 1 finished');

  console.log('stage 2: tags');

  obj = new Tag({name: 'slasher'});
  await obj.save();

  obj = new Tag({name: 'fpp'});
  await obj.save();

  obj = new Tag({name: 'shooter'});
  await obj.save();

  obj = new Tag({name: 'rpg'});
  await obj.save();

  console.log('stage 2 finished');
}

create().then()

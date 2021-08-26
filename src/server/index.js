const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const {HttpError} = require("./models/errors");

const {dbConnectionString} = require("./config/default");
const mongoose = require("mongoose");
const autoIncrement = require('./mongo-autoincr');
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

const {apiRouter} = require("./routes/api.route");

const staticPath = path.join(__dirname + '../../../dist/AHtNgApp');

app.use(cookieParser());
app.use(express.json());

app.use(express.static(staticPath));

app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.use((err, req, res, next) => {
  const {message} = err;

  console.log(req.url, message, err);

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({message});
  } else {
    res.status(500).json({message});
  }
});

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 8080;

  try {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start the server - ', err.message);
  }
}

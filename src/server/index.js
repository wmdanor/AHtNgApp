const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const {HttpError} = require("./models/errors");
const mongoose = require("mongoose");
const {dbConnectionString} = require("./config/default");

const staticPath = path.join(__dirname + '../../../dist/AHtNgApp');

app.use(cookieParser());

app.use(express.static(staticPath));

app.post('/api/auth/sign-in', (req, res) => {
  console.log(req.cookies)
  // res.cookie('lul', 'omegalul');
  res.cookie('lul', 'omegalul').json({status: 200});
});

app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.use((err, req, res, next) => {
  const {message} = err;

  console.log(message);

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({message});
  } else {
    res.status(500).json({message});
  }
});

mongoose.connect(dbConnectionString, {
  useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => {
  console.log('DB connection established');
}).catch(() => {
  console.error('Failed to establish DB connection');
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

const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const {HttpError} = require("./models/errors");

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

app.listen(process.env.PORT || 8080);

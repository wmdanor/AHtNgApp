const {UnauthorizedError} = require("../models/errors");
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../config/default");

const authMiddleware = (req, res, next) => {
  const authToken = req.cookies.jwt;

  if (!authToken) {
    throw new UnauthorizedError('Authorization token was not found');
  }

  try {
    const tokenPayload = jwt.verify(authToken, jwtSecret);
    req.user = {
      userId: tokenPayload.userId,
      email: tokenPayload.email,
      username: tokenPayload.username,
    };
    next();
  } catch (err) {
    throw new UnauthorizedError(err.message);
  }
}

module.exports = {
  authMiddleware,
}

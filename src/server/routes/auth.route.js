const express = require('express');
const {asyncWrapper} = require('../utils/routerUtils');
const {
  registerUser,
  loginUser,
  restorePassword,
} = require('../controllers/auth.controller');
const {
  signUpValidator,
  signInValidator,
  forgotPasswordValidator,
} = require('../middlewares/validation');

const authRouter = new express.Router();

authRouter.post('/sign-up', signUpValidator, asyncWrapper(registerUser));
authRouter.post('/sign-in', signInValidator, asyncWrapper(loginUser));
authRouter.post(
  '/forgot_password',
  forgotPasswordValidator,
  asyncWrapper(restorePassword),
);

module.exports = {
  authRouter,
};

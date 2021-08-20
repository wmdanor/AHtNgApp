const Joi = require('joi');

const offsetLimit = Joi.object({
  offset: Joi.number().integer().min(0).optional(),
  limit: Joi.number().integer().min(1).max(50).optional(),
});

const signUp = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().required().min(6).max(16),
  password: Joi.string().required().min(8).max(16),
});

const signIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(16),
});

const forgotPassword = Joi.object({
  email: Joi.string().email().required(),
});

const changePassword = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

module.exports = {
  offsetLimit,
  signUp,
  signIn,
  forgotPassword,
  changePassword,
};

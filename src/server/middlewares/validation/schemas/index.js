const Joi = require('joi');

const offsetLimit = Joi.object({
  offset: Joi.number().integer().min(0).optional(),
  limit: Joi.number().integer().min(1).max(50).optional(),
}).options({ allowUnknown: true });

offsetLimit.transform = {
  offset: Number,
  limit: Number,
}

const queryQueryParam = Joi.object({
  query: Joi.string().optional(),
}).options({ allowUnknown: true });

const paramId = Joi.object({
  id: Joi.number().integer().min(1).required(),
}).options({ allowUnknown: true });

paramId.transform = {
  id: Number,
}

const paramGameId = Joi.object({
  id: Joi.number().integer().min(1).required(),
}).options({ allowUnknown: true });

paramGameId.transform = {
  id: Number,
}

const paramFriendId = Joi.object({
  id: Joi.number().integer().min(1).required(),
}).options({ allowUnknown: true });

paramFriendId.transform = {
  id: Number,
}

const signUp = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().required().min(6).max(16),
  password: Joi.string().required().min(8).max(16),
}).options({ allowUnknown: true });

const signIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(16),
}).options({ allowUnknown: true });

const editProfile = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().required().min(6).max(16),
  age: Joi.number().integer().min(14).allow(null).optional(),
}).options({ allowUnknown: true });

editProfile.transform = {
  age: (age) => {
    if (age === null || age === undefined) {
      return age;
    }
    return Number(age);
  },
}

const forgotPassword = Joi.object({
  email: Joi.string().email().required(),
}).options({ allowUnknown: true });

const changePassword = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
}).options({ allowUnknown: true });

const queryGamesFilter = Joi.object({
  name: Joi.string().optional().allow(''),
  maxPrice: Joi.number().optional(),
  tags: Joi.alternatives(
    Joi.array().items(Joi.string()),
    Joi.string(),
  ).optional(),
}).options({ allowUnknown: true });

queryGamesFilter.transform = {
  maxPrice: Number,
  tags: obj => obj ? (Array.isArray(obj) ? obj : [obj]) : [],
}

module.exports = {
  queryQueryParam,
  offsetLimit,
  signUp,
  signIn,
  forgotPassword,
  changePassword,
  paramId, paramGameId, paramFriendId,
  queryGamesFilter,
  editProfile,
};

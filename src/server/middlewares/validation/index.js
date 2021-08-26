const {
  createBodyValidator,
  createQueryValidator, createParamsValidator,
} = require('./createValidator');
const {
  offsetLimit,
  signUp,
  signIn,
  forgotPassword,
  changePassword, paramId, paramGameId, paramFriendId, queryQueryParam,
} = require('./schemas');

module.exports = {
  queryQueryParamValidator: createQueryValidator(queryQueryParam),
  offsetLimitQueryValidator: createQueryValidator(offsetLimit),
  signUpValidator: createBodyValidator(signUp),
  signInValidator: createBodyValidator(signIn),
  forgotPasswordValidator: createBodyValidator(forgotPassword),
  changePasswordValidator: createBodyValidator(changePassword),
  paramIdValidator: createParamsValidator(paramId),
  paramGameIdValidator: createParamsValidator(paramGameId),
  paramFriendIdValidator: createParamsValidator(paramFriendId),
};

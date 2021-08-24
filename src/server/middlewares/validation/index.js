const {
  createBodyValidator,
  createQueryValidator,
} = require('./createValidator');
const {
  offsetLimit,
  signUp,
  signIn,
  forgotPassword,
  changePassword,
} = require('./schemas');

module.exports = {
  offsetLimitQueryValidator: createQueryValidator(offsetLimit),
  signUpValidator: createBodyValidator(signUp),
  signInValidator: createBodyValidator(signIn),
  forgotPasswordValidator: createBodyValidator(forgotPassword),
  changePasswordValidator: createBodyValidator(changePassword),
};

const {BadRequestError} = require('../../models/errors');

const createValidator = (part) => (schema) => {
  return async (req, res, next) => {
    try {
      const obj = req[part];
      await schema.validateAsync(obj);
      const {transform} = schema;
      if (transform) {
        for (const key of Object.keys(transform)) {
          obj[key] = transform[key](obj[key]);
        }
      }
      next();
    } catch (err) {
      next(new BadRequestError(err.message));
    }
  };
}

module.exports = {
  createBodyValidator: createValidator('body'),
  createQueryValidator: createValidator('query'),
  createParamsValidator: createValidator('params'),
};

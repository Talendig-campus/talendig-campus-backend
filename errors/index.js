const NotFoundError = require('./not-found');
const BadRequestError = require('./bad-request');
const UnauthorizedError = require('./unauthorized');
const UnauthenticatedError = require('./unauthenticated');

module.exports = {
  UnauthenticatedError, NotFoundError, BadRequestError, UnauthorizedError,
};

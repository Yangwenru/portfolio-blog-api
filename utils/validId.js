const httpError = require('./httpError');
module.exports = function validId(value) {
  if (typeof value !== 'string' || !/^[a-fA-F0-9]{24}$/.test(value)) {
    throw httpError(400, 'Invalid document ID');
  }
  return value;
};

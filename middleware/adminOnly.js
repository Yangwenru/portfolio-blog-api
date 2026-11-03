const httpError = require('../utils/httpError');
module.exports = function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') throw httpError(403, 'Admin access required');
  next();
};

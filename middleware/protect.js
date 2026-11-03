const jwt = require('jsonwebtoken');
const User = require('../models/User');
const httpError = require('../utils/httpError');

module.exports = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) throw httpError(401, "Not authenticated");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) throw httpError(401, "User not found");
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

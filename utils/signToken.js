const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
module.exports = function signToken(id) {
  return jwt.sign({}, jwtSecret, {
    subject: String(id), algorithm: 'HS256', expiresIn: '1h',
    issuer: 'portfolio-blog-api', audience: 'portfolio-client'
  });
};

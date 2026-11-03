const { rateLimit } = require('express-rate-limit');

exports.contactLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: { message: "Too many messages, try again later." } }
});

exports.loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: { message: "Too many attempts, try again later." } }
});

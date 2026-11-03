const httpError = require('./httpError');
module.exports = function userInput(body, register = true) {
  if (typeof body?.email !== 'string' || typeof body?.password !== 'string') {
    throw httpError(400, 'email and password must be text');
  }
  const email = body.email.trim().toLowerCase(), password = body.password;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw httpError(400, 'A valid email is required');
  }
  if (!password || Buffer.byteLength(password, 'utf8') > 72 ||
      (register && password.length < 8)) {
    throw httpError(400, 'Password requires 8+ characters and at most 72 bytes');
  }
  if (!register) return { email, password };
  const username = typeof body.username === 'string' ? body.username.trim().toLowerCase() : '';
  if (!/^[a-z0-9_]{3,30}$/.test(username)) {
    throw httpError(400, 'Username requires 3-30 letters, digits, or underscores');
  }
  return { username, email, password };
};

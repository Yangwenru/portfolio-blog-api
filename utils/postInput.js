const httpError = require('./httpError');
module.exports = function postInput(body) {
  if (!body || typeof body.title !== 'string' ||
      typeof body.content !== 'string') {
    throw httpError(400, 'title and content must be strings');
  }
  const title = body.title.trim(), content = body.content.trim();
  if (title.length < 3 || title.length > 120 ||
      content.length < 1 || content.length > 10000) {
    throw httpError(400, 'title: 3-120; content: 1-10000 characters');
  }
  return { title, content };
};

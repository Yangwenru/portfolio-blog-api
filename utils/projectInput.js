const httpError = require('./httpError');
module.exports = function projectInput(body) {
  const fields = ['title', 'description', 'imageUrl', 'repoUrl', 'liveUrl'];
  const result = {};
  for (const field of fields) {
    const value = body?.[field] ?? '';
    if (typeof value !== 'string') throw httpError(400, `${field} must be text`);
    result[field] = value.trim();
  }
  if (!result.title || !result.description) {
    throw httpError(400, 'title and description are required');
  }
  return result;
};

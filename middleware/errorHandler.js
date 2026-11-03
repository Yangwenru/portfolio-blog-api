module.exports = function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  let status = error.status || 500;
  let message = error.message;
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    status = 400;
    message = 'Invalid field value';
  }
  if (error.code === 11000) { status = 409; message = 'Account already exists'; }
  if (error.type === 'entity.parse.failed') {
    status = 400; message = 'Invalid JSON';
  }
  if (error.type === 'entity.too.large') {
    status = 413; message = 'JSON body exceeds 32 KB';
  }
  if (status < 400 || status > 599) status = 500;
  if (status >= 500) {
    console.error('Request failed', { name: error.name, status });
    message = 'Server error';
  }
  res.status(status).json({ error: { message } });
};

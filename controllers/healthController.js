const mongoose = require('mongoose');

// Public readiness check: reports whether the API can reach MongoDB.
// The response never includes the database address or error details.
module.exports = async function (req, res) {
  res.set('Cache-Control', 'no-store');
  try {
    // readyState 1 means the Mongoose connection is open.
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database is not connected');
    }
    // Ping the database with the same command used in Lab 06.
    await mongoose.connection.db.command({ ping: 1 });
    res.json({ status: 'ok' });
  } catch (error) {
    res.status(503).json({ status: 'unavailable' });
  }
};

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const app = require('./app');

// The hosting service supplies PORT; 3000 is the local fallback.
const port = process.env.PORT || 3000;

async function start() {
  try {
    // Fail fast when private production settings are missing.
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32 ||
        !process.env.CLIENT_ORIGIN) {
      throw new Error('Check the JWT secret and client origin.');
    }
    await connectDB();
    // Listen on 0.0.0.0 so the hosting service can reach the server.
    const server = app.listen(port, '0.0.0.0', function () {
      console.log('API ready on port ' + port);
    });
    // Stop accepting new requests, then close the database connection.
    function shutdown() {
      server.close(async function () {
        await mongoose.disconnect();
      });
    }
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('Startup failed. Check private settings and Atlas access.');
    process.exit(1);
  }
}

start();

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const env = require('./env');

let mongoServer;

async function connectDB() {
  if (env.production === false) {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    console.log('内存数据库地址：', uri);
    await mongoose.connect(uri);
  } else {
    await mongoose.connect(env.mongoUri);
  }
  console.log('✅ Database connected');
}

module.exports = connectDB;

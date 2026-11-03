require('dotenv').config({ quiet: true });
if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required');
// if (!process.env.MONGO_URI.includes('/portfolio_blog?')) {
//   throw new Error('MONGO_URI must target portfolio_blog');
// }
const jwtSecret = process.env.JWT_SECRET || '';
if (!/^[a-f0-9]{64}$/i.test(jwtSecret)) {
  throw new Error('JWT_SECRET must be 64 random hex characters');
}
module.exports = {
  mongoUri: process.env.MONGO_URI, jwtSecret,
  port: Number(process.env.PORT || 3000),
  production: process.env.NODE_ENV === 'production'
};

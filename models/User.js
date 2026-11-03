const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true,
    trim: true, match: /^[a-z0-9_]{3,30}$/ },
  email: { type: String, required: true, unique: true, lowercase: true,
    trim: true, maxlength: 254, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { type: String, required: true, minlength: 8, select: false,
    validate: value => Buffer.byteLength(value, 'utf8') <= 72 },
  role: { type: String, enum: ['author', 'admin'], default: 'author' }
}, { timestamps: true, collection: 'users' });
schema.pre('save', async function () {
  if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 12);
});
schema.methods.matchesPassword = function (value) {
  return bcrypt.compare(value, this.password);
};
module.exports = mongoose.model('User', schema);

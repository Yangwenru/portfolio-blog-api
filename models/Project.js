const mongoose = require('mongoose');
const httpsLink = value => {
  if (!value) return true;
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
};
const link = { type: String, default: '', maxlength: 500, validate: httpsLink };
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 3, maxlength: 120 },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  imageUrl: link, repoUrl: link, liveUrl: link,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true, collection: 'projects' });
module.exports = mongoose.model('Project', schema);

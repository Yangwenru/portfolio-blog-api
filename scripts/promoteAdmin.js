const { connectDB, closeDB } = require('../config/db');
const User = require('../models/User');
const Post = require('../models/Post');
const Project = require('../models/Project');
async function setup() {
  const email = (process.argv[2] || '').trim().toLowerCase();
  if (!email) throw new Error('Pass the registered administrator email');
  await connectDB();
  const user = await User.findOne({ email });
  if (!user) throw new Error('Register the account before promotion');
  user.role = 'admin';
  await user.save();
  const posts = await Post.updateMany({ author: null }, { $set: { author: user._id } });
  const projects = await Project.updateMany({ user: null }, { $set: { user: user._id } });
  console.log('Administrator configured; records assigned:',
    posts.modifiedCount, projects.modifiedCount);
}
setup().catch(error => { console.error(error.message); process.exitCode = 1; })
  .finally(closeDB);

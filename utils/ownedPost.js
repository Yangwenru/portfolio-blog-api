const Post = require('../models/Post');
const httpError = require('./httpError');
module.exports = async function ownedPost(req) {
  const post = await Post.findById(req.params.id);
  if (!post) throw httpError(404, 'Post not found');
  if (!post.author || String(post.author) !== req.user.id) {
    throw httpError(403, 'Only the post author may change this post');
  }
  return post;
};

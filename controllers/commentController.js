const Comment = require('../models/Comment');

// 获取某篇post下全部评论，按时间升序，填充作者username
exports.list = async function (req, res) {
  const comments = await Comment.find({ post: req.post._id })
    .sort({ createdAt: 1 })
    .populate('author', 'username');
  res.json(comments);
};

// 创建评论：author来自登录用户req.user，post来自req.post（URL参数，不读取body中的post）
exports.create = async function (req, res) {
  if (!req.body || typeof req.body.body !== 'string') {
    res.status(400);
    throw new Error('Send the comment body as text.');
  }
  const comment = await Comment.create({
    body: req.body.body,
    author: req.user._id,
    post: req.post._id
  });
  res.status(201).json(comment);
};

// 删除评论：评论作者 OR 博文作者可以删除，其他人403禁止
exports.remove = async function (req, res) {
  const comment = await Comment.findOne({
    _id: req.params.commentId,
    post: req.post._id
  });
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found on this post.');
  }
  const wroteComment = comment.author.toString() === req.user._id.toString();
  const ownsPost = req.post.author.toString() === req.user._id.toString();
  if (!wroteComment && !ownsPost) {
    res.status(403);
    throw new Error('Only the comment author or post author can delete it.');
  }
  await comment.deleteOne();
  res.status(204).end();
};
const Post = require('../models/Post');
const Comment = require('../models/Comment'); 
const postInput = require('../utils/postInput');
const httpError = require('../utils/httpError');
const ownedPost = require('../utils/ownedPost');

exports.list = async (req, res) => {
  res.json(await Post.find().sort({ createdAt: -1 }));
};

exports.detail = async function (req, res, next) {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }
    const comments = await Comment.find({ post: post._id })
      .sort({ createdAt: 1 })
      .populate('author', 'username');
    res.json({
      _id: post._id,
      title: post.title,
      content: post.content,
      author: post.author,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      comments: comments
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res) => {
  const post = await Post.create({ ...postInput(req.body), author: req.user._id });
  res.status(201).json(post);
};

exports.update = async (req, res) => {
  const post = await ownedPost(req);
  Object.assign(post, postInput(req.body));
  await post.save();
  res.json(post);
};

// 新增remove：有评论则409，不能删帖子
exports.remove = async (req, res, next) => {
  try {
    const post = await ownedPost(req);
    // 检查该post下是否存在评论
    const hasComment = await Comment.findOne({ post: post._id });
    if (hasComment) {
      res.status(409);
      throw new Error('Remove the comments before deleting this post.');
    }
    await post.deleteOne();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

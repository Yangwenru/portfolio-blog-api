const User = require('../models/User');
const userInput = require('../utils/userInput');
const signToken = require('../utils/signToken');
const httpError = require('../utils/httpError');

exports.register = async (req, res) => {
  const user = await User.create(userInput(req.body));
  res.status(201).json({
    id: user.id, username: user.username, email: user.email, role: user.role
  });
};

exports.login = async (req, res) => {
  const input = userInput(req.body, false);
  const user = await User.findOne({ email: input.email }).select('+password');
  if (!user || !(await user.matchesPassword(input.password))) {
    throw httpError(401, 'Invalid email or password');
  }
  res.set('Cache-Control', 'no-store').json({
    token: signToken(user.id),
    user: { id: user.id, username: user.username, role: user.role }
  });
};

// 新增me接口
exports.me = async (req, res) => {
  res.json({
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role
  });
};

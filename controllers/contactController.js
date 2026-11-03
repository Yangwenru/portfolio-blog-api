const Message = require('../models/Message.js');

exports.create = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = await Message.create({ name, email, message });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ error: { message: err.message } });
  }
};

exports.list = async (req, res) => {
  try {
    const messageList = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messageList);
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
  }
};

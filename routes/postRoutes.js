const express = require('express');
const controller = require('../controllers/postController');
const protect = require('../middleware/protect');

const router = express.Router();

// 挂载嵌套评论子路由
router.use('/:postId/comments', require('./commentRoutes'));

router.get('/', controller.list);
router.get('/:id', controller.detail);
router.post('/', protect, controller.create);
router.put('/:id', protect, controller.update);
router.delete('/:id', protect, controller.remove);

module.exports = router;
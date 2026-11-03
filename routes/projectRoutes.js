const router = require('express').Router();
const controller = require('../controllers/projectController');
const protect = require('../middleware/protect');
const adminOnly = require('../middleware/adminOnly');
const validId = require('../utils/validId');
router.param('id', (req, res, next, id) => { validId(id); next(); });
router.route('/').get(controller.list).post(protect, adminOnly, controller.create);
router.route('/:id').get(controller.detail)
  .put(protect, adminOnly, controller.update)
  .delete(protect, adminOnly, controller.remove);
module.exports = router;
console.log('adminOnly type:', typeof adminOnly)
console.log('controller.list:', typeof controller.list)
console.log('controller.detail:', typeof controller.detail)
console.log('controller.create:', typeof controller.create)
console.log('controller.update:', typeof controller.update)
console.log('controller.remove:', typeof controller.remove)

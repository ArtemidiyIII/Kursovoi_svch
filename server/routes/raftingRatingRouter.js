const Router = require('express');
const router = new Router();
const raftingRatingController = require('../controllers/raftingRatingController');
const checkrole = require('../middleware/checkRoleMiddleware');

router.post('/', checkrole('USER', 'ADMIN'), raftingRatingController.create);
router.get('/', raftingRatingController.getAll);
router.get('/:raftingId',  raftingRatingController.getByRaftingId);

module.exports = router;
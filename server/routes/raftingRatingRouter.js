const Router = require('express')
const router = new Router()
const raftingRatingController = require('../controllers/raftingRatingController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/', checkrole('USER','ADMIN'), raftingRatingController.create)
router.get('/', checkrole('USER','ADMIN'), raftingRatingController.getAll)
router.get('/:raftingId', checkrole('USER','ADMIN'), raftingRatingController.getByRaftingId)
//router.put('/:raftingId', checkrole('USER','ADMIN'), raftingRatingController.updateRaftingRaiting)

module.exports = router
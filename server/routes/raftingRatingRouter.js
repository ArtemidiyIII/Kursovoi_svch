const Router = require('express')
const router = new Router()
const raftingRatingController = require('../controllers/raftingRatingController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/', raftingRatingController.create) //checkrole('USER','ADMIN'),
router.get('/', raftingRatingController.getAll) //checkrole('USER','ADMIN'),
router.get('/:raftingId', raftingRatingController.getByRaftingId) //checkrole('USER','ADMIN'),
//router.put('/:raftingId', checkrole('USER','ADMIN'), raftingRatingController.updateRaftingRaiting)

module.exports = router
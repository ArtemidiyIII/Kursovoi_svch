const Router = require('express')
const router = new Router()
const raftingRaitingController = require('../controllers/raftingRaitingController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/', raftingRaitingController.create)
router.get('/', raftingRaitingController.getAll)
router.get('/:raftingId', raftingRaitingController.getByRaftingId)
router.put('/:raftingId',typeController.updateRaftingRaiting)

module.exports = router
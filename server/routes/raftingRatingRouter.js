const Router = require('express')
const router = new Router()
const raftingRaitingController = require('../controllers/raftingRaitingController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/', checkrole('USER','ADMIN'), raftingRaitingController.create)
router.get('/', checkrole('USER','ADMIN'), raftingRaitingController.getAll)
router.get('/:raftingId', checkrole('USER','ADMIN'), raftingRaitingController.getByRaftingId)
router.put('/:raftingId', checkrole('USER','ADMIN'), typeController.updateRaftingRaiting)

module.exports = router
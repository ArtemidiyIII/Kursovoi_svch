const Router = require('express')
const router = new Router()
const raftingController = require('../controllers/raftingController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/',checkrole('ADMIN'),raftingController.createRafting)
router.get('/',raftingController.getAll)
router.get('/:id',raftingController.getOne)
router.put('/:id', checkrole('ADMIN'), raftingController.update)
router.delete('/:id', checkrole('ADMIN'), raftingController.deleteRafting)

module.exports = router
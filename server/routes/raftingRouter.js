const Router = require('express')
const router = new Router()
const raftingController = require('../controllers/raftingController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/',checkrole('ADMIN'),raftingController.create)
router.get('/',raftingController.getAll)
router.get('/:id',raftingController.getOne)
router.delete('/:id',raftingController.delete)

module.exports = router
const Router = require('express')
const router = new Router()
const rentedItemController = require('../controllers/rentedItemController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/',checkrole('ADMIN'),rentedItemController.create)
router.get('/',rentedItemController.getAll)
router.get('/:id',rentedItemController.getOne)
router.put('/:id', checkrole('ADMIN'), rentedItemController.update)
router.delete('/:id', checkrole('ADMIN'), rentedItemController.delete)

module.exports = router
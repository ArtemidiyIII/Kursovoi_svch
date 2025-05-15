const Router = require('express')
const router = new Router()
const renteditemsController = require('../controllers/renteditemsController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/',checkrole('ADMIN'),renteditemsController.create)
router.get('/',renteditemsController.getAll)
router.get('/:id',renteditemsController.getOne)
router.put('/:id', checkrole('ADMIN'), renteditemsController.update)
router.delete('/:id', checkrole('ADMIN'), renteditemsController.delete)

module.exports = router
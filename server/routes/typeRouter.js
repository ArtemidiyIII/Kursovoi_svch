const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/',checkrole('ADMIN'), typeController.create)
router.get('/',typeController.getAll)
router.put('/:id',typeController.updateType)
router.delete('/:id',typeController.delete)

module.exports = router
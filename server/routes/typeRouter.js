const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/',checkrole('ADMIN'), typeController.create)
router.get('/',typeController.getAll)
router.put('/:id', checkrole('ADMIN'), typeController.updateType)
router.delete('/:id',checkrole('ADMIN'), typeController.delete)

module.exports = router
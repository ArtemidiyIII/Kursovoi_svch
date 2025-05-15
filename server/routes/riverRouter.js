const Router = require('express')
const router = new Router()
const riverController = require('../controllers/riverController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/',checkrole('ADMIN'), riverController.create)
router.get('/',riverController.getAll)
router.put('/:id', checkrole('ADMIN'), riverController.updateRiver)
router.delete('/:id',checkrole('ADMIN'), riverController.delete)

module.exports = router
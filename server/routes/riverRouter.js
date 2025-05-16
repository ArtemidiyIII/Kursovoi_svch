const Router = require('express')
const router = new Router()
const riverController = require('../controllers/riverController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/',checkrole('ADMIN'), riverController.createRiver)
router.get('/',riverController.getAll)
router.put('/:id',riverController.updateRiver)
router.delete('/:id',riverController.deleteRiver)

module.exports = router
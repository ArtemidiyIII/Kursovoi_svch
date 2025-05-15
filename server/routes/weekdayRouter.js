const Router = require('express')
const router = new Router()
const weekdayController = require('../controllers/weekdayController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/',checkrole('ADMIN'),weekdayController.create)
router.get('/',weekdayController.getAll)
router.put('/:id', checkrole('ADMIN'), weekdayController.updateWeekday)
router.delete('/:id', checkrole('ADMIN'), weekdayController.delete)

module.exports = router
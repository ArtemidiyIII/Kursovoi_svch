const Router = require('express')
const router = new Router()
const weekdayController = require('../controllers/weekdayController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/',checkrole('ADMIN'),weekdayController.createWeekday)
router.get('/',weekdayController.getAll)
router.put('/:id',weekdayController.updateWeekday)
router.delete('/:id',weekdayController.deleteWeekday)

module.exports = router
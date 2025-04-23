const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/',checkrole('ADMIN'),brandController.create)
router.get('/',brandController.getAll)
router.put('/:id', checkrole('ADMIN'), brandController.updateBrand)
router.delete('/:id', checkrole('ADMIN'), brandController.delete)

module.exports = router
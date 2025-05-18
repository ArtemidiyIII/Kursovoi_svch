const Router = require('express')
const router = new Router()
const ordersRentController = require('../controllers/ordersRentController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/add',ordersRentController.addToOrdersRent);
router.get('/:userId', ordersRentController.getOrdersRent);
router.post('/remove', ordersRentController.removeFromOrdersRent);
router.get('/ordersrent/:userId', ordersRentController.getOrdersRentId);

module.exports = router;
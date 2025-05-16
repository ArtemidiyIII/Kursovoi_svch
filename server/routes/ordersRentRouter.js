const Router = require('express')
const router = new Router()
const ordersRentController = require('../controllers/ordersRentController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/add',ordersRentController.addToRentOrders);
router.get('/:userId', ordersRentController.getRentOrders);
router.post('/remove', ordersRentController.removeFromRentOrders);
router.get('/ordersrent/:userId', ordersRentController.getRentOrdersId);

module.exports = router;
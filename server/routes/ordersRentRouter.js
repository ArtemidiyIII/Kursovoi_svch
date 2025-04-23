const Router = require('express')
const router = new Router()
const ordersRentController = require('../controllers/ordersRentController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/add',ordersRentController.addToOrders);
router.get('/:userId', ordersRentController.getOrders);
router.post('/remove', ordersRentController.removeFromOrders);
router.get('/orders/:userId', ordersRentController.getOrdersId);

module.exports = router;
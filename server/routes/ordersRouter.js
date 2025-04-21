const Router = require('express')
const router = new Router()
const ordersController = require('../controllers/ordersController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/add', ordersController.addToOrders);
router.get('/:userId', ordersController.getOrders);
router.post('/remove', ordersController.removeFromOrders);
router.get('/orders/:userId', ordersController.getOrdersId);

module.exports = router;
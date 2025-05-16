const Router = require('express')
const router = new Router()
const ordersRaftingController = require('../controllers/ordersRaftingController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/add',ordersRaftingController.addToRaftingOrders);
router.get('/:userId', ordersRaftingController.getRaftingOrders);
router.post('/remove', ordersRaftingController.removeFromRaftingOrders);
router.get('/ordersrafting/:userId', ordersRaftingController.getRaftingOrdersId);

module.exports = router;
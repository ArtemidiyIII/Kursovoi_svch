const Router = require('express')
const router = new Router()
const ordersRaftingController = require('../controllers/ordersRaftingController')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/add',ordersRaftingController.addToOrdersRafting);
router.get('/:userId', ordersRaftingController.getOrdersRafting);
router.post('/remove', ordersRaftingController.removeFromOrdersRafting);
router.get('/ordersrafting/:userId', ordersRaftingController.getOrdersRaftingId);

module.exports = router;
const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const ordersRaftingRouter = require('./ordersRaftingRouter')
const ordersRentRouter = require('./ordersRentRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const rentedItemRouter = require('./renteditemsRouter')
const raftingRouter = require('./raftingRouter')
const raftingRatingRouter = require('./raftingRatingRouter')


router.use('/user' , userRouter)
router.use('/ordersRafting', ordersRaftingRouter)
router.use('/ordersRent', ordersRentRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/rentedItem', rentedItemRouter)
router.use('/rafting', raftingRouter)
router.use('/raftingRating', raftingRatingRouter)

module.exports = router
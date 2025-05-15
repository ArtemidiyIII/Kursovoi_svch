const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const ordersRaftingRouter = require('./ordersRaftingRouter')
const ordersRentRouter = require('./ordersRentRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const renteditemsRouter = require('./renteditemsRouter')
const riverRouter = require('./riverRouter')
const weekdayRouter = require('./weekdayRouter')
const raftingRouter = require('./raftingRouter')
const raftingRatingRouter = require('./raftingRatingRouter')


router.use('/user' , userRouter)
router.use('/ordersRafting', ordersRaftingRouter)
router.use('/ordersRent', ordersRentRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/renteditems', renteditemsRouter)
router.use('/river', riverRouter)
router.use('/weekday', weekdayRouter)
router.use('/rafting', raftingRouter)
router.use('/raftingRating', raftingRatingRouter)

module.exports = router
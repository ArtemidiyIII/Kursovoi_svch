const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/registration',userController.registration)
router.post('/login',userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/users/report',userController.report)
router.post('/users/control', checkrole('ADMIN'), userController.control)

module.exports = router
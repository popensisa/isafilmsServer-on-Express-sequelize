const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/auth', authMiddleware, userController.check)
router.post('/update', userController.updateName)
router.get('/users', userController.getAllUsers)
router.get('/account',userController.getSelfUser)

module.exports = router
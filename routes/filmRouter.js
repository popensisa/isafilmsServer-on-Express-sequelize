const Router = require('express')
const router = new Router()
const filmController = require('../controllers/filmController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), filmController.create)
router.delete('/:id', checkRole('ADMIN'), filmController.delete)
router.get('/', filmController.getAll)
router.get('/:id', filmController.getOne)

module.exports = router
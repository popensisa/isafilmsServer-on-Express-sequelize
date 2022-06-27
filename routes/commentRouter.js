const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/:id', commentController.create)
router.get('/rev', commentController.getAll)
router.get('/:id', commentController.getAllForOne)
router.delete('/:id', checkRole('ADMIN'), commentController.delete)

module.exports = router